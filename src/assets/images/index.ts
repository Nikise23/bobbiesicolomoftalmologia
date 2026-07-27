import logo from './logo.webp';
import nosotros from './nosotros.png';
import fachada from './fachada.webp';
import fachadaFallback from './fachada.jpg';
import favicon from './favicon.png';
import drColom from './profesionales/dr-colom.jpg';
import draBobbiesi from './profesionales/dra-bobbiesi.webp';
import draConema from './profesionales/dra-conema.webp';
import drJulian from './profesionales/dr-julian.webp';
import estudioPlaceholder from './estudio-placeholder.svg';
import cirugiaPlaceholder from './cirugia-placeholder.svg';
import fondoOjo from './estudios/fondo-ojo.jpg';
import campoVisual from './estudios/campo-visual.webp';

export {
  logo,
  nosotros,
  fachada,
  fachadaFallback,
  favicon,
  drColom,
  draBobbiesi,
  draConema,
  drJulian,
  estudioPlaceholder,
  cirugiaPlaceholder,
  fondoOjo,
  campoVisual,
};

/** Fotos de profesionales por nombre exacto (API / overrides). */
export const fotosProfesionales: Record<string, string> = {
  'Dr. Francisco Colom': drColom,
  'Dra. Marianela Bobbiesi': draBobbiesi,
  'Dra. Martina Conema': draConema,
  'Dr. Juan Julián': drJulian,
};
