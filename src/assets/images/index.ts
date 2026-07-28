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
import topografiaCorneal from './estudios/topografia-corneal.png';
import oct from './estudios/oct.jpg';
import retinografia from './estudios/retinografia.webp';
import controlIntegral from './estudios/control-integral.webp';
import cirugiaRefractiva from './cirugias/cirugia-refractiva.webp';
import cirugiaCataratas from './cirugias/cirugia-cataratas.webp';
import cirugiaParpados from './cirugias/cirugia-parpados.webp';
import cirugiaEstrabismo from './cirugias/cirugia-estrabismo.webp';

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
  topografiaCorneal,
  oct,
  retinografia,
  controlIntegral,
  cirugiaRefractiva,
  cirugiaCataratas,
  cirugiaParpados,
  cirugiaEstrabismo,
};

/** Fotos de profesionales por nombre exacto (API / overrides). */
export const fotosProfesionales: Record<string, string> = {
  'Dr. Francisco Colom': drColom,
  'Dra. Marianela Bobbiesi': draBobbiesi,
  'Dra. Martina Conema': draConema,
  'Dr. Juan Julián': drJulian,
};
