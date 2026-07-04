import { especialidades } from '@/data/especialidades';
import { ScrollReveal } from '@/components/ScrollReveal';
import { onImageError } from '@/utils/imagen';

/**
 * Estudios y servicios. Cards con imagen de fondo 4:3, hover con zoom sutil,
 * y panel inferior claro flotante con guión dorado.
 */
export function Especialidades() {
  return (
    <section id="estudios" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="page-shell">
        <ScrollReveal>
          <p className="eyebrow">Diagnóstico</p>
          <h2 className="section-title mt-3 text-accent-600">Estudios y servicios</h2>
          <p className="section-subtitle-light">
            Contamos con equipamiento de última generación para el diagnóstico y
            seguimiento de la salud ocular.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {especialidades.map((item, i) => (
            <ScrollReveal key={item.nombre} direction="from-up" delay={(i % 3) * 90}>
              <article className="group flex h-full flex-col">
                <div className="overflow-hidden rounded-t-2xl">
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    width={640}
                    height={480}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    onError={onImageError}
                  />
                </div>
                <div className="-mt-6 mx-4 flex-1 rounded-2xl bg-brand-100 p-5 shadow-lg">
                  <span className="block h-0.5 w-8 bg-accent-500" aria-hidden />
                  <h3 className="mt-3 font-display text-lg font-bold text-brand-700">
                    {item.nombre}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-500/90">
                    {item.descripcion}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Especialidades;
