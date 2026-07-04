export type TipoPaciente = 'habitual' | 'nuevo';

export interface DatosPaciente {
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string; // dd/mm/aaaa
  celular: string;
  obraSocial: string;
  numeroObraSocial: string;
  email: string; // solo local (contacto/consentimiento)
  acepta: boolean;
}

export interface EstadoTurno {
  tipoPaciente: TipoPaciente | null;
  medico: string | null;
  fecha: string | null; // ISO YYYY-MM-DD
  hora: string | null;
  datos: DatosPaciente;
}

export const datosVacios: DatosPaciente = {
  nombre: '',
  apellido: '',
  dni: '',
  fechaNacimiento: '',
  celular: '',
  obraSocial: '',
  numeroObraSocial: '',
  email: '',
  acepta: false,
};

export type PasoId =
  | 'identificacion'
  | 'profesional'
  | 'fecha'
  | 'horario'
  | 'datos'
  | 'confirmacion';

export const ETIQUETAS_PASO: Record<PasoId, string> = {
  identificacion: 'Identificación',
  profesional: 'Profesional',
  fecha: 'Fecha',
  horario: 'Horario',
  datos: 'Tus datos',
  confirmacion: 'Confirmación',
};

/** Pasos del wizard según tipo de paciente (habitual omite el formulario completo). */
export function pasosPara(tipo: TipoPaciente | null): PasoId[] {
  if (!tipo) return ['identificacion'];
  const base: PasoId[] = ['identificacion', 'profesional', 'fecha', 'horario'];
  if (tipo === 'nuevo') return [...base, 'datos', 'confirmacion'];
  return [...base, 'confirmacion'];
}

export function etiquetasPasos(tipo: TipoPaciente | null): string[] {
  return pasosPara(tipo).map((id) => ETIQUETAS_PASO[id]);
}
