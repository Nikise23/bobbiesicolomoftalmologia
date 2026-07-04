import logoHominis from '@/assets/images/coberturas/hominis.png';
import logoIoma from '@/assets/images/coberturas/ioma.png';
import logoMedife from '@/assets/images/coberturas/medife.png';
import logoOsde from '@/assets/images/coberturas/osde.png';
import logoPremedic from '@/assets/images/coberturas/premedic.png';
import logoVisitar from '@/assets/images/coberturas/visitar.png';

export interface CoberturaMedica {
  nombre: string;
  logo: string;
  descripcion: string;
  planes: string[];
}

/** Obras sociales y prepagas con las que trabaja el consultorio. */
export const coberturas: CoberturaMedica[] = [
  {
    nombre: 'OSDE',
    logo: logoOsde,
    descripcion:
      'Consultas, estudios y cirugías oftalmológicas según tu plan. Consultanos por autorizaciones.',
    planes: ['210', '260', '310', '360', '410', '430', '450', '510'],
  },
  {
    nombre: 'Hominis',
    logo: logoHominis,
    descripcion:
      'Cobertura médica con planes flexibles. Te confirmamos prestaciones oftalmológicas al momento.',
    planes: ['100', '200', '300', '400', '500'],
  },
  {
    nombre: 'IOMA',
    logo: logoIoma,
    descripcion:
      'Obra social bonaerense. Atendemos afiliados con orden médica según normativa vigente.',
    planes: ['Plan A', 'Plan B', 'Plan C', 'Jóvenes', 'Monotributo'],
  },
  {
    nombre: 'Premedic',
    logo: logoPremedic,
    descripcion:
      'Medicina prepaga con distintos niveles de cobertura. Consultá disponibilidad de tu plan.',
    planes: ['Bronce', 'Plata', 'Oro', 'Platino'],
  },
  {
    nombre: 'Medifé',
    logo: logoMedife,
    descripcion:
      'Amplia red de prestadores. Coordinamos tu turno y te indicamos requisitos de tu plan.',
    planes: ['Clásico', 'Azul', 'Oro', 'Plata', 'Platino'],
  },
  {
    nombre: 'Visitar',
    logo: logoVisitar,
    descripcion:
      'Gestión de salud con planes corporativos e individuales. Escribinos para verificar tu cobertura.',
    planes: ['Básico', 'Superior', 'Premium', 'Corporativo'],
  },
];

export function mensajeWhatsappCobertura(cobertura: CoberturaMedica, plan?: string): string {
  const base = `Hola, quiero consultar por un turno oftalmológico con cobertura ${cobertura.nombre}`;
  return plan ? `${base} (plan ${plan}).` : `${base}.`;
}
