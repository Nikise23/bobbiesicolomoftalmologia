import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { coberturas, type CoberturaMedica } from '@/data/coberturas';
import { CoberturaDetalle } from '@/components/home/CoberturaDetalle';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';
import { onImageError } from '@/utils/imagen';

const COPIAS = 3;
const VELOCIDAD_AUTO = 0.6;
const PAUSA_INTERACCION_MS = 4000;
const UMBRAL_ARRASTRE = 12;

interface Interaccion {
  pointerId: number;
  startX: number;
  scrollLeft: number;
  moved: boolean;
  cobertura: CoberturaMedica | null;
}

/** Carrusel de coberturas: auto-scroll, arrastrable y detalle al tocar. */
export function Coberturas() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const interaccionRef = useRef<Interaccion>({
    pointerId: -1,
    startX: 0,
    scrollLeft: 0,
    moved: false,
    cobertura: null,
  });
  const pausaAutoRef = useRef(false);
  const bloqueAnchoRef = useRef(0);

  const [arrastrando, setArrastrando] = useState(false);
  const [seleccionada, setSeleccionada] = useState<CoberturaMedica | null>(null);
  const [hover, setHover] = useState(false);

  const items = Array.from({ length: COPIAS }, () => coberturas).flat();

  const pausarAuto = useCallback(() => {
    pausaAutoRef.current = true;
    window.setTimeout(() => {
      pausaAutoRef.current = false;
    }, PAUSA_INTERACCION_MS);
  }, []);

  const ajustarLoop = useCallback(() => {
    const el = scrollerRef.current;
    const bloque = bloqueAnchoRef.current;
    if (!el || bloque <= 0) return;
    if (el.scrollLeft >= bloque * 2) el.scrollLeft -= bloque;
    if (el.scrollLeft < bloque * 0.5) el.scrollLeft += bloque;
  }, []);

  const centrarCarrusel = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || bloqueAnchoRef.current === 0) return;
    el.scrollLeft = bloqueAnchoRef.current;
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const medir = () => {
      bloqueAnchoRef.current = el.scrollWidth / COPIAS;
      if (el.scrollLeft === 0) centrarCarrusel();
    };

    medir();
    window.addEventListener('resize', medir);
    return () => window.removeEventListener('resize', medir);
  }, [centrarCarrusel]);

  useEffect(() => {
    if (seleccionada) return;

    let frame: number;
    const tick = () => {
      const el = scrollerRef.current;
      const bloque = bloqueAnchoRef.current;

      if (
        el &&
        bloque > 0 &&
        !pausaAutoRef.current &&
        interaccionRef.current.pointerId === -1 &&
        !hover &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        el.scrollLeft += VELOCIDAD_AUTO;
        ajustarLoop();
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [seleccionada, hover, ajustarLoop]);

  const mover = (direccion: -1 | 1) => {
    pausarAuto();
    scrollerRef.current?.scrollBy({ left: direccion * 320, behavior: 'smooth' });
  };

  const iniciarInteraccion = (
    e: PointerEvent<HTMLElement>,
    cobertura: CoberturaMedica | null
  ) => {
    const el = scrollerRef.current;
    if (!el) return;

    e.stopPropagation();
    pausarAuto();
    setArrastrando(true);

    interaccionRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      moved: false,
      cobertura,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const moverInteraccion = (e: PointerEvent<HTMLElement>) => {
    const s = interaccionRef.current;
    if (s.pointerId !== e.pointerId) return;

    const el = scrollerRef.current;
    if (!el) return;

    const delta = e.clientX - s.startX;
    if (Math.abs(delta) > UMBRAL_ARRASTRE) s.moved = true;
    if (s.moved) el.scrollLeft = s.scrollLeft - delta;
  };

  const finInteraccion = (e: PointerEvent<HTMLElement>) => {
    const s = interaccionRef.current;
    if (s.pointerId !== e.pointerId) return;

    e.currentTarget.releasePointerCapture(e.pointerId);
    ajustarLoop();

    if (s.cobertura && !s.moved) {
      setSeleccionada(s.cobertura);
    }

    interaccionRef.current.pointerId = -1;
    setArrastrando(false);
  };

  const propsInteraccion = (cobertura: CoberturaMedica | null) => ({
    onPointerDown: (e: PointerEvent<HTMLElement>) => iniciarInteraccion(e, cobertura),
    onPointerMove: moverInteraccion,
    onPointerUp: finInteraccion,
    onPointerCancel: finInteraccion,
  });

  return (
    <section id="coberturas" className="scroll-mt-20 bg-white py-16 sm:py-20">
      <div className="page-shell">
        <ScrollReveal>
          <p className="eyebrow">Atención por obra social</p>
          <h2 className="section-title mt-3 text-accent-600">Coberturas médicas</h2>
          <p className="section-subtitle-light">
            Trabajamos con las principales obras sociales y prepagas. Tocá cada logo para ver
            planes y consultar por WhatsApp.
          </p>
        </ScrollReveal>
      </div>

      <div
        className="relative mt-10"
        aria-label="Obras sociales y prepagas"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <button
          type="button"
          onClick={() => mover(-1)}
          aria-label="Ver coberturas anteriores"
          className="absolute left-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-600 shadow-md transition-colors hover:bg-brand-100 sm:left-4 sm:flex"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => mover(1)}
          aria-label="Ver más coberturas"
          className="absolute right-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-600 shadow-md transition-colors hover:bg-brand-100 sm:right-4 sm:flex"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-16" />

        <div
          ref={scrollerRef}
          className={[
            'scrollbar-hide flex touch-pan-x gap-5 overflow-x-auto scroll-smooth px-6 pb-3 pt-1 sm:gap-6 sm:px-12',
            arrastrando ? 'cursor-grabbing select-none' : 'cursor-grab',
          ].join(' ')}
          {...propsInteraccion(null)}
        >
          {items.map((cobertura, i) => (
            <button
              key={`${cobertura.nombre}-${i}`}
              type="button"
              aria-label={`Ver planes de ${cobertura.nombre}`}
              {...propsInteraccion(cobertura)}
              className="flex w-52 shrink-0 items-center justify-center rounded-2xl border border-brand-200/80 bg-brand-50 px-6 py-7 transition-colors hover:border-accent-400 hover:bg-white hover:shadow-md sm:w-64 sm:px-8 sm:py-8"
            >
              <img
                src={cobertura.logo}
                alt=""
                width={220}
                height={96}
                loading="lazy"
                draggable={false}
                className="pointer-events-none max-h-16 w-full object-contain sm:max-h-20 md:max-h-24"
                onError={onImageError}
              />
            </button>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-brand-400">
          Se mueve solo · deslizá, arrastrá o tocá un logo para ver planes
        </p>
      </div>

      {seleccionada && (
        <CoberturaDetalle cobertura={seleccionada} onCerrar={() => setSeleccionada(null)} />
      )}
    </section>
  );
}

export default Coberturas;
