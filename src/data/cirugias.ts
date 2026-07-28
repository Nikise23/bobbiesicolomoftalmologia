import {
  cirugiaRefractiva,
  cirugiaCataratas,
  cirugiaParpados,
  cirugiaEstrabismo,
} from '@/assets/images';

/**
 * Cirugías ofrecidas (sección #cirugia del home).
 */
export interface Cirugia {
  nombre: string;
  descripcion: string;
  imagen: string;
}

export const cirugias: Cirugia[] = [
  {
    nombre: 'Cirugía de Cataratas',
    descripcion:
      'Reemplazo del cristalino opaco por un lente intraocular mediante facoemulsificación, un procedimiento ambulatorio y de rápida recuperación.',
    imagen: cirugiaCataratas,
  },
  {
    nombre: 'Cirugía Refractiva (Para dejar de usar lentes)',
    descripcion:
      'Corrección de miopía, hipermetropía y astigmatismo para reducir o eliminar la dependencia de anteojos y lentes de contacto.',
    imagen: cirugiaRefractiva,
  },
  {
    nombre: 'Cirugía de Estrabismo',
    descripcion:
      'Corrección del desalineamiento de los ojos (estrabismo) mediante el ajuste de los músculos oculares, mejorando la visión binocular y la estética.',
    imagen: cirugiaEstrabismo,
  },
  {
    nombre: 'Cirugía Estética de Párpados',
    descripcion:
      'Excisión de verrugas y quistes, y corrección de párpados caídos.',
    imagen: cirugiaParpados,
  },
];
