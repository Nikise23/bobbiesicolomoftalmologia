import { site, whatsappUrl } from '@/config/site';
import { SeoJsonLd } from '@/components/SeoJsonLd';
import { TurnosWizard } from '@/components/turnos/TurnosWizard';
import { WhatsAppIcon, PhoneIcon } from '@/components/icons';

export function Turnos() {
  return (
    <>
      <SeoJsonLd
        title={`Solicitar turno | ${site.nombreCorto}`}
        description={`Reservá tu turno en ${site.nombre}, ${site.ciudad}.`}
        path="/turnos"
      />

      <section className="bg-brand-50 py-16 sm:py-20">
        <div className="page-shell max-w-3xl">
          <div className="text-center">
            <p className="eyebrow">Turnos</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-brand-800 sm:text-5xl">
              Solicitá tu turno
            </h1>
          </div>

          {site.turnosOnline ? (
            <div className="mt-10">
              <TurnosWizard />
            </div>
          ) : (
            <div className="turnos-panel mt-10">
              <div className="turnos-body text-center">
                <h2 className="font-display text-2xl font-bold text-brand-700">
                  Reserva online próximamente
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-brand-500">
                  Estamos habilitando la reserva de turnos online. Por ahora,
                  coordiná tu turno por WhatsApp o teléfono y te respondemos a la
                  brevedad.
                </p>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Turno por WhatsApp
                  </a>
                  <a
                    href={`tel:${site.telefono.replace(/\s/g, '')}`}
                    className="btn-secondary !text-brand-700 !border-brand-300"
                  >
                    <PhoneIcon className="h-4 w-4" />
                    {site.telefono}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Turnos;
