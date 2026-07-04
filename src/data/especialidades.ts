import { estudioPlaceholder } from '@/assets/images';

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
    imagen: estudioPlaceholder,
  },
  {
    nombre: 'Campo Visual Computarizado',
    descripcion:
      'Evaluación funcional del campo visual, clave en el control del glaucoma y otras afecciones del nervio óptico.',
    imagen: estudioPlaceholder,
  },
  {
    nombre: 'Retinografía',
    descripcion:
      'Fotografía de fondo de ojo de alta definición para documentar y controlar la evolución de la retina.',
    imagen: estudioPlaceholder,
  },
  {
    nombre: 'Biometría',
    descripcion:
      'Medición precisa del ojo para el cálculo del lente intraocular previo a la cirugía de cataratas.',
    imagen: estudioPlaceholder,
  },
  {
    nombre: 'Paquimetría',
    descripcion:
      'Medición del espesor corneal, fundamental en la evaluación del glaucoma y la cirugía refractiva.',
    imagen: estudioPlaceholder,
  },
  {
    nombre: 'Control oftalmológico integral',
    descripcion:
      'Examen completo de agudeza visual, presión ocular y salud general del ojo para todas las edades.',
    imagen: estudioPlaceholder,
  },
];
