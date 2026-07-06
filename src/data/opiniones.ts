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
    autor: 'Florencia Orrego',
    fecha: 'hace 3 meses',
    estrellas: 5,
    texto:
      'Mis hijos se atienden con la Dra. Bobbiesi y es un encanto, súper paciente y atenta. Tienen uno de 3 años y la otra de 10 meses. Destaco no solo que es una gran profesional, sino la calidez: voy a todos lados sola con mis hijos.',
  },
  {
    autor: 'Rocío Buonsignore',
    fecha: 'hace 4 meses',
    estrellas: 5,
    texto:
      'Tuvimos muy buena experiencia tanto con la doctora como con el doctor. Súper puntuales con los turnos y muy amables en todo momento. Los chicos de recepción también súper bien. Recomiendo mucho este lugar.',
  },
  {
    autor: 'César Valle',
    fecha: 'hace 1 mes',
    estrellas: 5,
    texto:
      'Hice un examen de la vista y tuve una buena atención por parte del personal. Recomiendo contactarlos por WhatsApp. Saludos.',
  },
  {
    autor: 'Matías Andre',
    fecha: 'hace 4 meses',
    estrellas: 5,
    texto:
      'Excelente atención, te explican todo muy claro. Fui por mí y también por mi hijo y siempre muy bien. Los recomiendo.',
  },
  {
    autor: 'Guada Ibarra',
    fecha: 'hace 2 meses',
    estrellas: 5,
    texto:
      'Excelente atención médica. En recepción también nos atendieron muy bien. El cuerpo médico es excelente. Muy recomendable.',
  },
  {
    autor: 'Sofi Pisani',
    fecha: 'hace 4 meses',
    estrellas: 5,
    texto:
      'Ya fui varias veces y siempre la atención es excelente, siempre atienden en horario y todos los profesionales son muy cálidos. Hoy tuve que ir por una urgencia y me dieron un sobreturno en el día y me atendieron en el horario indicado. Muy contenta de haber conocido los consultorios, ahora siempre que tengo que ir, voy con ellos.',
  },
];
