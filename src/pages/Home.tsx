import { site } from '@/config/site';
import { SeoJsonLd } from '@/components/SeoJsonLd';
import { Hero } from '@/components/home/Hero';
import { Nosotros } from '@/components/home/Nosotros';
import { Profesionales } from '@/components/home/Profesionales';
import { Especialidades } from '@/components/home/Especialidades';

export function Home() {
  return (
    <>
      <SeoJsonLd
        title={`${site.nombre} | ${site.ciudad} — ${site.nombreCorto}`}
        description={site.seo.descripcion}
        path="/"
      />
      <Hero />
      <Nosotros />
      <Profesionales />
      <Especialidades />
    </>
  );
}

export default Home;
