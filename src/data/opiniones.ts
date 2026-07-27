/**
 * Opiniones de pacientes — fuente: Google Maps
 * Negocio: Oftalmología Odontología Colom Bobbiesi · Muñoz 909, San Miguel
 */

export interface Opinion {
  autor: string;
  /** Texto relativo o fecha, ej. "hace 3 meses" */
  fecha: string;
  estrellas: number;
  texto: string;
}

/** Promedio y cantidad total en Google (actualizar si cambia). */
export const opinionesResumen = {
  promedio: 4.9,
  total: 146,
};

export const opiniones: Opinion[] = [
  {
    autor: 'sofy songs',
    fecha: 'hace 1 semana',
    estrellas: 5,
    texto:
      'La verdad no puedo decir mucho. Me cambiaron la vida. Después de un año sin respuesta por parte de otros médicos la cirugía fue un éxito. La doctora muy profesional y la recepcionista súper amable. Mucha paciencia con los niños ambas, yo ya era una "niña" de 20 años así que pudimos hablar bien y me explicó todo.',
  },
  {
    autor: 'Belén Demarco',
    fecha: 'hace 2 semanas',
    estrellas: 5,
    texto:
      'Excelente atención. Fuimos con mi hija de 4 años y las dos nos atendimos con el Dr. Colom. Tanto él como la recepcionista fueron muy amables, cálidos y profesionales. Da gusto encontrar lugares que atienden con tanta dedicación y respeto. Sin dudas, lo recomiendo.',
  },
  {
    autor: 'Gimena Cabrera',
    fecha: 'hace 3 semanas',
    estrellas: 5,
    texto:
      'Excelente atención en oftalmología, atienden super bien!! Siempre atienden a horario!!',
  },
  {
    autor: 'César Valle',
    fecha: 'hace 1 mes',
    estrellas: 5,
    texto:
      'Hice un examen de la vista y tuve una buena atención por parte del personal. Recomiendo contactarlos por WhatsApp. Saludos.',
  },
  {
    autor: 'Guada Ibarra',
    fecha: 'hace 2 meses',
    estrellas: 5,
    texto:
      'Excelente atención médica. En recepción también nos atendieron muy bien. El cuerpo médico es excelente. Muy recomendable.',
  },
  {
    autor: 'Florencia Orrego',
    fecha: 'hace 3 meses',
    estrellas: 5,
    texto:
      'Mis hijos se atienden con la Dra. Bobbiesi y es un encanto, súper paciente y atenta. Tienen uno de 3 años y la otra de 10 meses. Destaco no solo que es una gran profesional, sino la calidez: voy a todos lados sola con mis hijos.',
  },
];
