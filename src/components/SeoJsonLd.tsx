import { useEffect } from 'react';
import { site } from '@/config/site';

interface SeoJsonLdProps {
  /** Título de la pestaña para esta página. */
  title?: string;
  /** Meta description para esta página. */
  description?: string;
  /** Path canónico (ej: "/cirugia"). */
  path?: string;
}

function buildJsonLd() {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: site.nombre,
    description: site.seo.descripcion,
    url: site.siteUrl,
    telephone: site.telefono,
    medicalSpecialty: 'Ophthalmologic',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.direccion,
      addressLocality: site.ciudad,
      addressRegion: site.provincia,
      addressCountry: 'AR',
    },
    openingHoursSpecification: site.horariosSchema.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dias,
      opens: h.abre,
      closes: h.cierra,
    })),
  };

  if (site.geo.lat && site.geo.lng) {
    data.geo = {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    };
  }

  return data;
}

/**
 * Inyecta structured data schema.org (MedicalClinic) y actualiza
 * título, meta description y canonical por página.
 */
export function SeoJsonLd({ title, description, path }: SeoJsonLdProps) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }

    const canonicalHref = `${site.siteUrl.replace(/\/$/, '')}${path ?? ''}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalHref);
  }, [title, description, path]);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(buildJsonLd());
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}

export default SeoJsonLd;
