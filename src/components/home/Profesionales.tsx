import { useProfesionales } from '@/hooks/useProfesionales';
import { ScrollReveal, revealSide } from '@/components/ScrollReveal';
import { onImageError } from '@/utils/imagen';

/**
 * Grilla de profesionales. Datos mergeados: API pública (GET /medicos) +
 * overrides locales (profesionales.json). Estados loading/error/vacío accesibles.
 */
export function Profesionales() {
  const { profesionales, loading, error } = useProfesionales();

  return (
    <section id="profesionales" className="scroll-mt-20 bg-brand-100 py-20 sm:py-24">
      <div className="page-shell">
        <ScrollReveal>
          <p className="eyebrow">Nuestro equipo</p>
          <h2 className="section-title-light mt-3">Profesionales</h2>
          <p className="section-subtitle-light">
            Un equipo especializado en el cuidado integral de tu visión.
          </p>
        </ScrollReveal>

        {/* Región accesible para estados dinámicos */}
        <div aria-live="polite" className="mt-10">
          {loading && (
            <p className="text-sm text-brand-500">Cargando profesionales…</p>
          )}

          {error && (
            <p role="alert" className="mb-6 text-sm text-accent-700">
              {error} Mostrando la información disponible.
            </p>
          )}

          {!loading && profesionales.length === 0 && (
            <p className="text-sm text-brand-500">
              La información de los profesionales estará disponible próximamente.
            </p>
          )}

          <div className="grid gap-8 lg:grid-cols-2">
            {profesionales.map((pro, i) => (
              <ScrollReveal key={pro.nombre} direction={revealSide(i)} delay={i * 90}>
                <article className="flex h-full flex-col gap-6 rounded-3xl border border-brand-200 bg-white p-6 shadow-lg sm:flex-row">
                  <div className="shrink-0 overflow-hidden rounded-2xl sm:w-40">
                    <img
                      src={pro.foto}
                      alt={`Foto de ${pro.nombre}`}
                      width={320}
                      height={400}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover"
                      onError={onImageError}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-display text-xl font-bold text-accent-600">
                      {pro.nombre}
                    </h3>
                    <p className="mt-1 text-sm font-bold uppercase tracking-wide text-brand-500">
                      {pro.especialidad}
                    </p>
                    {pro.resena && (
                      <p className="mt-3 text-sm leading-relaxed text-brand-500/90">
                        {pro.resena}
                      </p>
                    )}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profesionales;
