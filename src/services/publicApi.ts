import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';
import { API_URL, PUBLIC_API_KEY, USE_API_PROXY } from '@/config/site';

/**
 * Cliente de la API pública de turnos de colom-bobbiesi.
 *
 * Contrato: {API_URL}/api/public/v1
 *
 * Dos modos:
 *  - Proxy (producción, VITE_USE_API_PROXY=true): las requests van a un proxy
 *    same-origin (/api/turnos/*) que inyecta X-API-Key del lado del servidor.
 *    Así la clave NUNCA se expone en el bundle del frontend.
 *  - Directo (dev local, VITE_USE_API_PROXY=false): pega a la API real con
 *    X-API-Key desde VITE_PUBLIC_API_KEY (solo en .env.local, nunca commitear).
 */

/** Base same-origin del proxy (fase de producción). */
const PROXY_BASE = '/api/turnos';
/** Base directa de la API pública. */
const DIRECT_BASE = `${API_URL}/api/public/v1`;
/** En dev, Vite reenvía /api/public/v1 → backend (ver vite.config.ts). */
const DEV_PROXY_BASE = '/api/public/v1';

const directBaseURL = import.meta.env.DEV ? DEV_PROXY_BASE : DIRECT_BASE;
const baseURL = USE_API_PROXY ? PROXY_BASE : directBaseURL;

/** true si la API key la inyecta el proxy de Vite (dev) o el proxy de producción. */
const usaProxyServerSide =
  USE_API_PROXY || (import.meta.env.DEV && !USE_API_PROXY);

const client: AxiosInstance = axios.create({
  baseURL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: agrega X-API-Key solo si el cliente pega directo al backend
// (producción sin proxy). En dev, Vite inyecta la key en el proxy local.
client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (!usaProxyServerSide && PUBLIC_API_KEY) {
    config.headers.set('X-API-Key', PUBLIC_API_KEY);
  }
  return config;
});

/**
 * Reintento simple: solo para GET, hasta 1 reintento en errores de red o 503.
 */
client.interceptors.response.use(undefined, async (error: AxiosError) => {
  const config = error.config as
    | (InternalAxiosRequestConfig & { _retryCount?: number })
    | undefined;

  const isGet = (config?.method ?? 'get').toLowerCase() === 'get';
  const status = error.response?.status;
  const retriable = !error.response || status === 503;

  if (config && isGet && retriable) {
    config._retryCount = config._retryCount ?? 0;
    if (config._retryCount < 1) {
      config._retryCount += 1;
      await new Promise((r) => setTimeout(r, 800));
      return client(config);
    }
  }
  return Promise.reject(error);
});

/* -------------------------------------------------------------------------- */
/* Tipos del contrato                                                          */
/* -------------------------------------------------------------------------- */

export interface MedicosResponse {
  medicos: string[];
}

export interface DisponibilidadResponse {
  medico: string;
  fecha: string;
  horarios_disponibles: string[];
  total: number;
}

export interface DiaDisponibilidad {
  fecha: string;
  horarios_disponibles: string[];
  total: number;
}

export interface DisponibilidadRangoResponse {
  medico: string;
  desde: string;
  hasta: string;
  dias: DiaDisponibilidad[];
}

/** Body para reservar turno (POST /turnos). */
export interface ReservaTurno {
  medico: string;
  fecha: string; // YYYY-MM-DD
  hora: string; // HH:MM
  dni: string;
  /** Requeridos solo si el DNI no existe todavía en el sistema. */
  nombre?: string;
  apellido?: string;
  celular?: string;
  obra_social?: string;
  numero_obra_social?: string;
  fecha_nacimiento?: string; // dd/mm/aaaa
  observacion?: string;
}

export interface TurnoPaciente {
  medico: string;
  fecha: string;
  hora: string;
  [key: string]: unknown;
}

export interface TurnosPacienteResponse {
  turnos?: TurnoPaciente[];
  [key: string]: unknown;
}

/* -------------------------------------------------------------------------- */
/* Endpoints                                                                   */
/* -------------------------------------------------------------------------- */

export async function getMedicos(signal?: AbortSignal): Promise<string[]> {
  const { data } = await client.get<MedicosResponse>('/medicos', { signal });
  return data.medicos ?? [];
}

export async function getDisponibilidad(
  medico: string,
  fecha: string,
  signal?: AbortSignal
): Promise<string[]> {
  const { data } = await client.get<DisponibilidadResponse>('/disponibilidad', {
    params: { medico, fecha },
    signal,
  });
  return data.horarios_disponibles ?? [];
}

export async function getDisponibilidadRango(
  medico: string,
  desde: string,
  hasta: string,
  signal?: AbortSignal
): Promise<DiaDisponibilidad[]> {
  const { data } = await client.get<DisponibilidadRangoResponse>('/disponibilidad-rango', {
    params: { medico, desde, hasta },
    signal,
  });
  return data.dias ?? [];
}

export async function crearTurno(body: ReservaTurno): Promise<unknown> {
  const { data } = await client.post('/turnos', body);
  return data;
}

export async function getTurnosPaciente(
  dni: string,
  futuros = true
): Promise<TurnoPaciente[]> {
  const { data } = await client.get<TurnosPacienteResponse>('/turnos', {
    params: { dni, futuros: futuros ? 1 : 0 },
  });
  return data.turnos ?? [];
}

export async function cancelarTurno(
  dni: string,
  fecha: string,
  hora: string
): Promise<unknown> {
  const { data } = await client.delete('/turnos', {
    data: { dni, fecha, hora },
  });
  return data;
}

/* -------------------------------------------------------------------------- */
/* Manejo de errores                                                           */
/* -------------------------------------------------------------------------- */

export interface ApiError {
  status?: number;
  message: string;
  /** true si conviene ofrecer WhatsApp como alternativa. */
  fallbackWhatsapp: boolean;
}

/**
 * Traduce un error de axios a un mensaje amigable en español rioplatense.
 */
export function parseApiError(error: unknown): ApiError {
  if (axios.isCancel(error)) {
    return { message: 'Solicitud cancelada.', fallbackWhatsapp: false };
  }

  const axiosError = error as AxiosError<{ error?: string; message?: string }>;
  const status = axiosError.response?.status;
  const backendMsg =
    axiosError.response?.data?.error ?? axiosError.response?.data?.message;

  switch (status) {
    case 400:
      return {
        status,
        message:
          backendMsg ??
          'Revisá los datos ingresados: hay algún campo incompleto o con formato incorrecto.',
        fallbackWhatsapp: false,
      };
    case 401:
      return {
        status,
        message: import.meta.env.DEV
          ? 'Falta o es incorrecta VITE_PUBLIC_API_KEY en .env.local. Guardá el archivo y reiniciá npm run dev.'
          : 'Turnos online sin configurar en el sitio (falta la clave de API en Render). Elegí un día y probá igual, o escribinos por WhatsApp.',
        fallbackWhatsapp: true,
      };
    case 403:
      return {
        status,
        message: import.meta.env.DEV
          ? 'Origen no autorizado. Usá npm run dev (proxy local) o agregá http://localhost:5173 en PUBLIC_API_CORS_ORIGIN del backend.'
          : 'Origen no autorizado (revisar CORS en backend).',
        fallbackWhatsapp: true,
      };
    case 409:
      return {
        status,
        message: 'Ese horario acaba de ocuparse, elegí otro.',
        fallbackWhatsapp: false,
      };
    case 503:
      return {
        status,
        message: 'Turnos online temporalmente no disponibles.',
        fallbackWhatsapp: true,
      };
    default:
      if (!axiosError.response) {
        return {
          message:
            'No pudimos conectar con el servicio de turnos. Revisá tu conexión o probá de nuevo.',
          fallbackWhatsapp: true,
        };
      }
      return {
        status,
        message:
          backendMsg ?? 'Ocurrió un error inesperado. Probá nuevamente en unos minutos.',
        fallbackWhatsapp: true,
      };
  }
}
