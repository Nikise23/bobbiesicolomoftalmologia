/** Validaciones de los datos del paciente (paso 4 del wizard). */

export const validarDni = (dni: string): boolean => /^\d{7,8}$/.test(dni.trim());

export const validarCelular = (cel: string): boolean =>
  /^\d{6,15}$/.test(cel.replace(/\D/g, ''));

/** Formatea dígitos a dd/mm/aaaa mientras se escribe (sin pedir las barras). */
export function formatearFechaNacimientoInput(valor: string): string {
  const digitos = valor.replace(/\D/g, '').slice(0, 8);
  if (digitos.length <= 2) return digitos;
  if (digitos.length <= 4) return `${digitos.slice(0, 2)}/${digitos.slice(2)}`;
  return `${digitos.slice(0, 2)}/${digitos.slice(2, 4)}/${digitos.slice(4)}`;
}

/** Espera dd/mm/aaaa y valida que sea una fecha real y pasada. */
export function validarFechaNacimiento(valor: string): boolean {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(valor.trim());
  if (!match) return false;
  const [, dd, mm, yyyy] = match;
  const dia = Number(dd);
  const mes = Number(mm);
  const anio = Number(yyyy);
  if (mes < 1 || mes > 12) return false;
  const fecha = new Date(anio, mes - 1, dia);
  const esReal =
    fecha.getFullYear() === anio &&
    fecha.getMonth() === mes - 1 &&
    fecha.getDate() === dia;
  return esReal && fecha < new Date() && anio > 1900;
}

export const validarEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const validarNombre = (valor: string): boolean => valor.trim().length >= 2;
