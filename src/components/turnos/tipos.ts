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

export const PASOS = [
  'Profesional',
  'Fecha',
  'Horario',
  'Tus datos',
  'Confirmación',
] as const;
