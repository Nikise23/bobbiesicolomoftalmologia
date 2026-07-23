import logo from './logo.webp';
import nosotros from './nosotros.png';
import fachada from './fachada.webp';
import fachadaFallback from './fachada.jpg';
import favicon from './favicon.png';
import drColom from './profesionales/dr-colom.jpg';
import draBobbiesi from './profesionales/dra-bobbiesi.jpg';
import draConema from './profesionales/dra-conema.webp';
import drJulian from './profesionales/dr-julian.webp';
import estudioPlaceholder from './estudio-placeholder.svg';
import cirugiaPlaceholder from './cirugia-placeholder.svg';

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
};

/** Fotos de profesionales por nombre exacto (API / overrides). */
export const fotosProfesionales: Record<string, string> = {
  'Dr. Francisco Colom': drColom,
  'Dra. Marianela Bobbiesi': draBobbiesi,
  'Dra. Martina Conema': draConema,
  'Dr. Juan Julián': drJulian,
};
