import { site } from '@/config/site';
import { SeoJsonLd } from '@/components/SeoJsonLd';
import { Cirugia as CirugiaSection } from '@/components/home/Cirugia';

/** Página dedicada de cirugía (indexable; el home también tiene la sección #cirugia). */
export function Cirugia() {
  return (
    <>
      <SeoJsonLd
        title={`Cirugía oftalmológica | ${site.nombreCorto}`}
        description={`Cirugías oculares en ${site.ciudad}: cataratas, estrabismo, párpados y más. Consultá en ${site.nombre}.`}
        path="/cirugia"
      />
      <CirugiaSection />
    </>
  );
}

export default Cirugia;
