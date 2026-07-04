import { site, whatsappUrl, mapsUrl } from '@/config/site';
import { SeoJsonLd } from '@/components/SeoJsonLd';
import { ScrollReveal } from '@/components/ScrollReveal';
import { UbicacionConsultorio } from '@/components/UbicacionConsultorio';
import {
  PhoneIcon,
  WhatsAppIcon,
  MapPinIcon,
  ClockIcon,
  MailIcon,
} from '@/components/icons';

export function Contacto() {
  return (
    <>
      <SeoJsonLd
        title={`Contacto y ubicación | ${site.nombreCorto}`}
        description={`Contactá al consultorio oftalmológico ${site.nombreCorto} en ${site.ciudad}. Dirección, teléfono, WhatsApp y horarios.`}
        path="/contacto"
      />

      <section className="bg-brand-50 py-20 sm:py-24">
        <div className="page-shell">
          <ScrollReveal>
            <p className="eyebrow">Estamos para atenderte</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-brand-800 sm:text-5xl">
              Contacto
            </h1>
            <p className="section-subtitle-light">
              Escribinos, llamanos o acercate al consultorio. Te esperamos.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <ScrollReveal direction="from-left">
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-500/20 text-accent-600">
                    <MapPinIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-display font-semibold text-brand-700">Dirección</h2>
                    <a
                      href={mapsUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-sm text-brand-600 hover:text-accent-600"
                    >
                      {site.direccion} — {site.ciudad}, {site.provincia}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-500/20 text-accent-600">
                    <PhoneIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-display font-semibold text-brand-700">Teléfono</h2>
                    <a
                      href={`tel:${site.telefono.replace(/\s/g, '')}`}
                      className="mt-1 block text-sm text-brand-600 hover:text-accent-600"
                    >
                      {site.telefono}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-accent-600">
                    <WhatsAppIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-display font-semibold text-brand-700">WhatsApp</h2>
                    <a
                      href={whatsappUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-sm text-accent-600 hover:text-accent-700"
                    >
                      Escribinos por WhatsApp
                    </a>
                  </div>
                </li>

                {site.email && (
                  <li className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-500/20 text-accent-600">
                      <MailIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="font-display font-semibold text-brand-700">Email</h2>
                      <a
                        href={`mailto:${site.email}`}
                        className="mt-1 block text-sm text-brand-600 hover:text-accent-600"
                      >
                        {site.email}
                      </a>
                    </div>
                  </li>
                )}

                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-500/20 text-accent-600">
                    <ClockIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-display font-semibold text-brand-700">Horarios</h2>
                    <ul className="mt-1 space-y-1 text-sm text-brand-600">
                      {site.horarios.map((h) => (
                        <li key={h.dias}>
                          <span className="font-medium text-brand-700">{h.dias}:</span>{' '}
                          {h.horas}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </ScrollReveal>

            <ScrollReveal direction="from-right" delay={100}>
              <UbicacionConsultorio />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contacto;
