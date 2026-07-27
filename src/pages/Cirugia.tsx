import { Navigate } from 'react-router-dom';

/** Compatibilidad: /cirugia redirige a la sección del home. */
export function Cirugia() {
  return <Navigate to={{ pathname: '/', hash: 'cirugia' }} replace />;
}

export default Cirugia;
