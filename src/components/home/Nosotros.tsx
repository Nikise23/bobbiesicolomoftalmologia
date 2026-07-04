import nosotrosImg from '@/assets/images/nosotros.png';
import { nosotros } from '@/data/nosotros';
import { site } from '@/config/site';
import { ScrollReveal } from '@/components/ScrollReveal';
import { onImageError } from '@/utils/imagen';

/** Sección "Nosotros" con párrafos editables e imagen del consultorio. */
export function Nosotros() {
  return (
    <section id="nosotros" className="scroll-mt-20 bg-brand-50 py-20 sm:py-24">
      <div className="page-shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal direction="from-left">
          <p className="eyebrow">{site.nombreCorto}</p>
          <h2 className="section-title-light mt-3">{nosotros.titulo}</h2>
          <div className="mt-6 space-y-4">
            {nosotros.parrafos.map((parrafo, i) => (
              <p key={i} className="text-base leading-relaxed text-brand-600">
                {parrafo}
              </p>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="from-right" delay={100}>
          <div className="flex justify-center lg:justify-end">
            <figure className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-lg lg:max-w-md">
              <img
                src={nosotrosImg}
                alt={`Colom y Bobbiesi en la entrada del consultorio oftalmológico, ${site.direccion}`}
                width={825}
                height={1024}
                loading="lazy"
                className="mx-auto block aspect-[825/1024] w-full object-contain object-center"
                onError={onImageError}
              />
            </figure>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default Nosotros;
