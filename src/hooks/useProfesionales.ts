import { useEffect, useState } from 'react';
import { fotosProfesionales } from '@/assets/images';
import profesionalPlaceholder from '@/assets/images/profesional-placeholder.svg';
import { getMedicos } from '@/services/publicApi';
import profesionalesLocal from '@/data/profesionales.json';

export interface ProfesionalOverride {
  /** Nombre para mostrar en la web (ej. Dr. Francisco Colom). */
  medicoNombre: string;
  /** Nombre exacto en la agenda/API. Si falta, se infiere quitando Dr./Dra. */
  medicoApi?: string;
  especialidad?: string;
  resena?: string;
  foto?: string;
  /** Clases extra de Tailwind para el <img> (zoom / object-position). */
  fotoClase?: string;
  orden?: number;
  /** false = no aparece en la web ni en turnos online. */
  visible?: boolean;
}

export interface Profesional {
  /** Nombre para mostrar (Dr./Dra.). */
  nombre: string;
  /** Nombre exacto para GET /disponibilidad y POST /turnos. */
  medicoApi: string;
  especialidad: string;
  resena: string;
  foto: string;
  /** Clases extra para encuadre/zoom de la foto. */
  fotoClase?: string;
  /** Días y momento de atención (ej. "Miércoles y viernes por la tarde"). */
  agenda?: string;
  orden: number;
  /** true si el nombre vino de la API pública. */
  desdeApi: boolean;
}

const overrides = profesionalesLocal as ProfesionalOverride[];

const FOTO_PLACEHOLDER = profesionalPlaceholder;

/** Quita prefijo Dr./Dra. para comparar con la agenda. */
function normalizarNombre(n: string): string {
  return n.replace(/^(Dr\.|Dra\.)\s+/i, '').trim().toLowerCase();
}

function medicoApiDesdeOverride(o: ProfesionalOverride): string {
  if (o.medicoApi?.trim()) return o.medicoApi.trim();
  return o.medicoNombre.replace(/^(Dr\.|Dra\.)\s+/i, '').trim();
}

/** Busca en profesionales.json el médico que corresponde al nombre de la API. */
function buscarOverridePorApi(nombreApi: string): ProfesionalOverride | undefined {
  const norm = normalizarNombre(nombreApi);
  return overrides.find((o) => {
    if (o.visible === false) return false;
    return (
      normalizarNombre(medicoApiDesdeOverride(o)) === norm ||
      normalizarNombre(o.medicoNombre) === norm
    );
  });
}

function construirProfesional(
  o: ProfesionalOverride,
  medicoApi: string,
  desdeApi: boolean,
  agenda = ''
): Profesional {
  return {
    nombre: o.medicoNombre,
    medicoApi,
    especialidad: o.especialidad ?? 'Oftalmología',
    resena: o.resena ?? '',
    foto: fotosProfesionales[o.medicoNombre] ?? o.foto ?? FOTO_PLACEHOLDER,
    fotoClase: o.fotoClase,
    agenda: agenda || undefined,
    orden: o.orden ?? 999,
    desdeApi,
  };
}

/** Profesional habilitado por la API que todavía no tiene perfil local. */
function construirProfesionalDesdeApi(medicoApi: string, agenda = ''): Profesional {
  return {
    nombre: medicoApi.trim(),
    medicoApi: medicoApi.trim(),
    especialidad: 'Oftalmología',
    resena: '',
    foto: FOTO_PLACEHOLDER,
    agenda: agenda || undefined,
    orden: 999,
    desdeApi: true,
  };
}

/** Solo overrides visibles (fallback total cuando la API falla). */
function fallbackLocal(): Profesional[] {
  return overrides
    .filter((o) => o.visible !== false)
    .map((o) => construirProfesional(o, medicoApiDesdeOverride(o), false))
    .sort((a, b) => a.orden - b.orden);
}

/**
 * Lista de profesionales para la web y turnos online.
 * La API define qué médicos son visibles. profesionales.json solo complementa
 * nombre, foto, especialidad, reseña y orden cuando existe un perfil local.
 */
export function useProfesionales() {
  const [profesionales, setProfesionales] = useState<Profesional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let activo = true;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { medicos: nombresApi, agendas } = await getMedicos(controller.signal);
        if (!activo) return;

        const lista = nombresApi
          .map((nombreApi) => {
            const override = buscarOverridePorApi(nombreApi);
            const agenda = agendas[nombreApi] ?? '';
            return override
              ? construirProfesional(override, nombreApi.trim(), true, agenda)
              : construirProfesionalDesdeApi(nombreApi, agenda);
          })
          .sort((a, b) => a.orden - b.orden);

        setProfesionales(lista.length > 0 ? lista : fallbackLocal());
      } catch (err) {
        if (!activo || controller.signal.aborted) return;
        // Fallback total al JSON local, pero registramos el error para accesibilidad.
        setError('No pudimos actualizar la lista desde el sistema de turnos.');
        setProfesionales(fallbackLocal());
      } finally {
        if (activo) setLoading(false);
      }
    })();

    return () => {
      activo = false;
      controller.abort();
    };
  }, []);

  return { profesionales, loading, error };
}

/** Parte el resumen de agenda en ítems (separados por punto). */
export function agendaComoItems(agenda?: string): string[] {
  if (!agenda?.trim()) return [];
  return agenda
    .split(/\.\s+/)
    .map((parte) => parte.replace(/\.$/, '').trim())
    .filter(Boolean);
}

