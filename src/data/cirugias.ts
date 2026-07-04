import { cirugiaPlaceholder } from '@/assets/images';

/**
 * Cirugías ofrecidas (página /cirugia).
 * Reemplazá `cirugiaPlaceholder` por fotos reales en src/assets/images/ cuando las tengas.
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
    imagen: cirugiaPlaceholder,
  },
  {
    nombre: 'Cirugía Refractiva',
    descripcion:
      'Corrección de miopía, hipermetropía y astigmatismo para reducir o eliminar la dependencia de anteojos y lentes de contacto.',
    imagen: cirugiaPlaceholder,
  },
  {
    nombre: 'Cirugía de Pterigión',
    descripcion:
      'Extracción del pterigión con técnicas que minimizan la recidiva y preservan la superficie ocular.',
    imagen: cirugiaPlaceholder,
  },
  {
    nombre: 'Cirugía de Párpados',
    descripcion:
      'Tratamiento quirúrgico de patologías palpebrales que afectan la función visual y la estética del ojo.',
    imagen: cirugiaPlaceholder,
  },
];
