import { site } from '@/config/site';
import { SeoJsonLd } from '@/components/SeoJsonLd';
import { Hero } from '@/components/home/Hero';
import { Nosotros } from '@/components/home/Nosotros';
import { Profesionales } from '@/components/home/Profesionales';
import { Especialidades } from '@/components/home/Especialidades';
import { Coberturas } from '@/components/home/Coberturas';
import { Opiniones } from '@/components/home/Opiniones';

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
      <Opiniones />
      <Coberturas />
      <Especialidades />
    </>
  );
}

export default Home;
