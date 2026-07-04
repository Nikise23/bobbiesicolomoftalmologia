/** Utilidades de fecha para el wizard de turnos. */

export const MAX_DIAS = 60;

const MESES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

const DIAS = [
  'domingo',
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  'sábado',
];

/** Devuelve YYYY-MM-DD en horario local (no UTC). */
export function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Parsea YYYY-MM-DD a Date local. */
export function fromIsoDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/** Domingo (0) no se atiende. */
export function esDiaHabil(date: Date): boolean {
  return date.getDay() !== 0;
}

/** true si la fecha está dentro del rango permitido (hoy .. hoy+MAX_DIAS) y es día hábil. */
export function esFechaSeleccionable(date: Date, maxDias = MAX_DIAS): boolean {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const limite = new Date(hoy);
  limite.setDate(limite.getDate() + maxDias);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d >= hoy && d <= limite && esDiaHabil(d);
}

/** "sábado 5 de julio" */
export function formatearFechaLarga(iso: string): string {
  const d = fromIsoDate(iso);
  return `${DIAS[d.getDay()]} ${d.getDate()} de ${MESES[d.getMonth()]}`;
}

/** "julio 2026" para el encabezado del calendario. */
export function tituloMes(anio: number, mes: number): string {
  return `${MESES[mes]} ${anio}`;
}

export { MESES, DIAS };
