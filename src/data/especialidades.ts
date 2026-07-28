import {
  fondoOjo,
  campoVisual,
  topografiaCorneal,
  oct,
  retinografia,
  controlIntegral,
} from '@/assets/images';

/**
 * Estudios y servicios de diagnóstico ofrecidos.
 * Reemplazá `estudioPlaceholder` por fotos reales en src/assets/images/ cuando las tengas.
 */
export interface Especialidad {
  nombre: string;
  descripcion: string;
  imagen: string;
}

export const especialidades: Especialidad[] = [
  {
    nombre: 'OCT (Tomografía de Coherencia Óptica)',
    descripcion:
      'Estudio de alta resolución de la retina y el nervio óptico para el diagnóstico y seguimiento de patologías maculares y glaucoma.',
    imagen: oct,
  },
  {
    nombre: 'Campo Visual Computarizado',
    descripcion:
      'Evaluación funcional del campo visual, clave en el control del glaucoma y otras afecciones del nervio óptico.',
    imagen: campoVisual,
  },
  {
    nombre: 'Retinografía',
    descripcion:
      'Fotografía de fondo de ojo de alta definición para documentar y controlar la evolución de la retina.',
    imagen: retinografia,
  },
  {
    nombre: 'Fondo de ojo y toma de presión intraocular',
    descripcion:
      'Examen del interior del ojo (retina, nervio óptico y vasos) junto con la medición de la presión intraocular, fundamental para el diagnóstico y seguimiento de glaucoma y otras patologías oculares.',
    imagen: fondoOjo,
  },
  {
    nombre: 'Topografía corneal y paquimetría',
    descripcion:
      'Mapeo de la curvatura y forma de la córnea junto con la medición de su espesor. Útil en el diagnóstico de queratocono, el control del glaucoma y la evaluación previa a cirugía refractiva o de cataratas.',
    imagen: topografiaCorneal,
  },
  {
    nombre: 'Control oftalmológico integral',
    descripcion:
      'Examen completo de agudeza visual, presión ocular y salud general del ojo para todas las edades.',
    imagen: controlIntegral,
  },
];
