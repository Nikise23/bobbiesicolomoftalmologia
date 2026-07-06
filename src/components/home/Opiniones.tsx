import { opiniones, opinionesResumen } from '@/data/opiniones';
import { googleReviewsUrl } from '@/config/site';
import { ScrollReveal } from '@/components/ScrollReveal';
import { StarIcon, ArrowRightIcon } from '@/components/icons';

function Estrellas({ cantidad }: { cantidad: number }) {
  return (
    <div className="flex gap-0.5 text-accent-500" aria-label={`${cantidad} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon
          key={i}
          className={`h-4 w-4 ${i < cantidad ? 'opacity-100' : 'opacity-25'}`}
        />
      ))}
    </div>
  );
}

function iniciales(nombre: string): string {
  return nombre
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

/** Opiniones de pacientes (Google) — datos editables en src/data/opiniones.ts */
export function Opiniones() {
  const url = googleReviewsUrl();

  return (
    <section id="opiniones" className="scroll-mt-20 bg-brand-100 py-16 sm:py-20">
      <div className="page-shell">
        <ScrollReveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Opiniones</p>
              <h2 className="section-title-light mt-3">Lo que dicen nuestros pacientes</h2>
              <p className="section-subtitle-light mt-3">
                Reseñas verificadas en Google. Tu experiencia también nos importa.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-brand-200 bg-white px-5 py-4 shadow-sm">
              <p className="font-display text-3xl font-bold text-brand-800">
                {opinionesResumen.promedio.toFixed(1)}
              </p>
              <div>
                <Estrellas cantidad={Math.round(opinionesResumen.promedio)} />
                <p className="mt-1 text-xs text-brand-500">
                  {opinionesResumen.total} opiniones en Google
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {opiniones.map((opinion, i) => (
            <ScrollReveal key={opinion.autor + opinion.fecha} delay={(i % 3) * 80}>
              <article className="flex h-full flex-col rounded-2xl border border-brand-200/80 bg-white p-5 shadow-sm">
                <Estrellas cantidad={opinion.estrellas} />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-brand-600">
                  &ldquo;{opinion.texto}&rdquo;
                </blockquote>
                <footer className="mt-4 flex items-center gap-3 border-t border-brand-100 pt-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-500/15 font-display text-sm font-bold text-accent-700"
                    aria-hidden
                  >
                    {iniciales(opinion.autor)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-brand-700">{opinion.autor}</p>
                    <p className="text-xs text-brand-400">{opinion.fecha}</p>
                  </div>
                </footer>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={120}>
          <div className="mt-10 text-center">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex"
            >
              Ver todas las opiniones en Google
              <ArrowRightIcon className="h-4 w-4" />
            </a>
            <p className="mt-3 text-xs text-brand-400">
              Fuente: Google Maps · {opinionesResumen.total} opiniones verificadas
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default Opiniones;
