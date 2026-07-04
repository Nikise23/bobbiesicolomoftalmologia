/**
 * Configuración centralizada del consultorio.
 *
 * Editá los valores por defecto de abajo con los datos reales del consultorio,
 * o sobreescribilos con variables de entorno VITE_* (ver .env.example).
 *
 * Los valores marcados como [PLACEHOLDER] son de ejemplo: reemplazalos.
 */

const env = import.meta.env;

const toBool = (value: string | undefined, fallback = false): boolean => {
  if (value === undefined) return fallback;
  return value === 'true' || value === '1';
};

export const site = {
  /** Nombre completo del consultorio (títulos, SEO, schema.org). */
  nombre: 'Consultorio Oftalmológico Colom · Bobbiesi',
  /** Nombre corto (header, footer, menciones breves). */
  nombreCorto: 'Colom · Bobbiesi',
  /** Título principal del hero. */
  tagline: 'Colom-Bobbiesi',
  /** Ciudad y provincia. */
  ciudad: 'San Miguel',
  provincia: 'Buenos Aires',

  /** Datos de contacto. */
  direccion: env.VITE_CONSULTORIO_DIRECCION ?? 'Muñoz 909, San Miguel',
  telefono: env.VITE_CONSULTORIO_TELEFONO ?? '+54 11 2715-6477',
  /** WhatsApp SIN el signo +, formato internacional (ej: 5493511234567). */
  whatsapp: env.VITE_WHATSAPP ?? '5491127156477',
  whatsappMensaje:
    env.VITE_WHATSAPP_MSG ??
    'Hola, quiero solicitar un turno en el consultorio oftalmológico Colom · Bobbiesi.',
  email: '',

  /** URLs. */
  siteUrl: env.VITE_SITE_URL ?? 'https://www.ejemplo.com.ar',
  /** Panel interno / sistema de historias clínicas (link "Acceso personal"). */
  sistemaUrl: env.VITE_SISTEMA_URL ?? 'https://colom-bobbiesi.onrender.com/',
  /** iframe de Google Maps embebido en Contacto. */
  mapsEmbedUrl: env.VITE_MAPS_EMBED_URL ?? '',
  /** Link a Google Maps (direcciones). Se genera desde la dirección si queda vacío. */
  mapsUrl: '',

  /** Redes sociales (dejar vacío para ocultar). */
  redes: {
    instagram: 'https://www.instagram.com/colom.bobbiesi.consultorios/',
    facebook: '',
  },

  /** Horarios de atención (texto libre + estructurado para schema.org). */
  horariosTexto: 'Lunes a viernes de 9 a 19 h · Sábados de 9 a 13 h',
  horarios: [
    { dias: 'Lunes a viernes', horas: '09:00 - 19:00' },
    { dias: 'Sábados', horas: '09:00 - 13:00' },
  ],
  /** Para schema.org openingHoursSpecification. */
  horariosSchema: [
    {
      dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      abre: '09:00',
      cierra: '19:00',
    },
    { dias: ['Saturday'], abre: '09:00', cierra: '13:00' },
  ],

  /** Coordenadas para schema.org geo (opcional). */
  geo: {
    lat: 0,
    lng: 0,
  },

  /** Feature flags. */
  turnosOnline: toBool(env.VITE_TURNOS_ONLINE, false),

  /** Máximo de días a futuro para reservar (debe coincidir con PUBLIC_API_MAX_DIAS del backend). */
  turnosMaxDias: (() => {
    const n = Number(env.VITE_PUBLIC_API_MAX_DIAS);
    return Number.isFinite(n) && n > 0 ? n : 60;
  })(),

  /** SEO. */
  seo: {
    descripcion:
      'Consultorio oftalmológico en San Miguel, Buenos Aires. Oftalmología general, oftalmopediatría y cirugía de cataratas con Colom · Bobbiesi. Solicitá tu turno.',
    keywords:
      'oftalmología, oculista, oftalmólogo, San Miguel, oftalmopediatría, turnos, cataratas, cirugía de cataratas, OCT, campo visual, Colom, Bobbiesi',
    ogImage: '/og-image.jpg',
  },
} as const;

/** Base del backend (sin /api/public/v1). */
export const API_URL = env.VITE_API_URL ?? 'https://colom-bobbiesi.onrender.com';

/** Si true, el frontend pega a un proxy same-origin que inyecta la API key. */
export const USE_API_PROXY = toBool(env.VITE_USE_API_PROXY, false);

/** API key para dev local directo (NO commitear en producción). */
export const PUBLIC_API_KEY = env.VITE_PUBLIC_API_KEY ?? '';

/** URL de WhatsApp lista para usar en enlaces. */
export function whatsappUrl(mensaje?: string): string {
  const texto = encodeURIComponent(mensaje ?? site.whatsappMensaje);
  return `https://wa.me/${site.whatsapp}?text=${texto}`;
}

/** URL de Google Maps a partir de la dirección (o mapsUrl si está seteada). */
export function mapsUrl(): string {
  if (site.mapsUrl) return site.mapsUrl;
  const q = encodeURIComponent(`${site.direccion}, ${site.ciudad}, ${site.provincia}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}
