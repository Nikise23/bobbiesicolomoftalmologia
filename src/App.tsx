import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Home } from '@/pages/Home';
import { Turnos } from '@/pages/Turnos';
import { Cirugia } from '@/pages/Cirugia';
import { Contacto } from '@/pages/Contacto';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="turnos" element={<Turnos />} />
        <Route path="cirugia" element={<Cirugia />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
