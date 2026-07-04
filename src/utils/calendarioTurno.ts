import { site } from '@/config/site';
import { formatearFechaLarga } from '@/utils/fecha';

export interface TurnoCalendario {
  medico: string;
  fecha: string;
  hora: string;
  paciente?: string;
  dni?: string;
}

const TZ = 'America/Argentina/Buenos_Aires';
/** Duración estimada del turno para el evento del calendario. */
const DURACION_MIN = 20;

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function fechaHoraLocal(fecha: string, hora: string, minutosExtra = 0): string {
  const [y, mo, d] = fecha.split('-').map(Number);
  const [h, m] = hora.split(':').map(Number);
  const date = new Date(y, mo - 1, d, h, m + minutosExtra, 0);
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
}

function escapeIcs(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

function resumen(turno: TurnoCalendario): string {
  return `Turno oftalmológico · ${turno.medico}`;
}

function descripcion(turno: TurnoCalendario): string {
  const lineas = [
    `Profesional: ${turno.medico}`,
    `Fecha: ${formatearFechaLarga(turno.fecha)}`,
    `Hora: ${turno.hora}`,
  ];
  if (turno.paciente) lineas.push(`Paciente: ${turno.paciente}`);
  if (turno.dni) lineas.push(`DNI: ${turno.dni}`);
  lineas.push('', site.nombre, `Tel: ${site.telefono}`);
  return lineas.join('\n');
}

function ubicacion(): string {
  return `${site.direccion}, ${site.ciudad}, ${site.provincia}`;
}

export function generarIcs(turno: TurnoCalendario): string {
  const uid = `turno-${turno.fecha}-${turno.hora.replace(':', '')}-${turno.dni ?? 'guest'}@bobbiesicolom`;
  const now = new Date();
  const dtstamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Colom Bobbiesi//Turnos//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=${TZ}:${fechaHoraLocal(turno.fecha, turno.hora)}`,
    `DTEND;TZID=${TZ}:${fechaHoraLocal(turno.fecha, turno.hora, DURACION_MIN)}`,
    `SUMMARY:${escapeIcs(resumen(turno))}`,
    `DESCRIPTION:${escapeIcs(descripcion(turno))}`,
    `LOCATION:${escapeIcs(ubicacion())}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function descargarTurnoIcs(turno: TurnoCalendario): void {
  const blob = new Blob([generarIcs(turno)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `turno-${turno.fecha}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function urlGoogleCalendar(turno: TurnoCalendario): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: resumen(turno),
    dates: `${fechaHoraLocal(turno.fecha, turno.hora)}/${fechaHoraLocal(turno.fecha, turno.hora, DURACION_MIN)}`,
    details: descripcion(turno),
    location: ubicacion(),
    ctz: TZ,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
