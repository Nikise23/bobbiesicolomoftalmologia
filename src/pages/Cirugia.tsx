import { cirugias } from '@/data/cirugias';
import { site } from '@/config/site';
import { SeoJsonLd } from '@/components/SeoJsonLd';
import { ScrollReveal } from '@/components/ScrollReveal';
import { TurnosCta } from '@/components/TurnosCta';
import { onImageError } from '@/utils/imagen';

const MENSAJE_CIRUGIA =
  'Hola, quiero hacer una consulta sobre una cirugía oftalmológica.';

export function Cirugia() {
  return (
    <>
      <SeoJsonLd
        title={`Cirugías oftalmológicas | ${site.nombreCorto}`}
        description={`Cirugías oculares en ${site.ciudad}: cataratas, refractiva, pterigión y más. ${site.nombre}.`}
        path="/cirugia"
      />

      <section className="bg-brand-50 py-20 sm:py-24">
        <div className="page-shell">
          <ScrollReveal>
            <p className="eyebrow">Tratamientos quirúrgicos</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-brand-800 sm:text-5xl">
              Cirugía oftalmológica
            </h1>
            <p className="section-subtitle-light">
              Realizamos las principales cirugías oculares con técnicas modernas y
              un seguimiento personalizado antes y después del procedimiento.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {cirugias.map((cirugia, i) => (
              <ScrollReveal key={cirugia.nombre} direction="from-up" delay={(i % 2) * 90}>
                <article className="group flex h-full flex-col">
                  <div className="overflow-hidden rounded-t-2xl">
                    <img
                      src={cirugia.imagen}
                      alt={cirugia.nombre}
                      width={720}
                      height={540}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      onError={onImageError}
                    />
                  </div>
                  <div className="-mt-6 mx-4 flex-1 rounded-2xl bg-brand-100 p-6 shadow-lg">
                    <span className="block h-0.5 w-8 bg-accent-500" aria-hidden />
                    <h2 className="mt-3 font-display text-xl font-bold text-brand-700">
                      {cirugia.nombre}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-brand-500/90">
                      {cirugia.descripcion}
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-16 rounded-3xl border border-brand-200 bg-white p-8 text-center shadow-lg sm:p-12">
            <h2 className="section-title-light">¿Tenés dudas sobre una cirugía?</h2>
            <p className="section-subtitle-light mx-auto">
              Coordiná una consulta para evaluar tu caso y despejar todas tus dudas.
            </p>
            <TurnosCta
              className="mt-6 justify-center"
              whatsappMensaje={MENSAJE_CIRUGIA}
            />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

export default Cirugia;
