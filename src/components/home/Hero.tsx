import { site } from '@/config/site';
import { TurnosCta } from '@/components/TurnosCta';

/** Capas decorativas del hero: gradientes, orbes y anillos (tema visual/oftalmología). */
function HeroBackground() {
  return (
    <div className="hero-bg pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="hero-bg__mesh" />
      <div className="hero-bg__orb hero-bg__orb--1" />
      <div className="hero-bg__orb hero-bg__orb--2" />
      <div className="hero-bg__orb hero-bg__orb--3" />
      <div className="hero-bg__dots" />
      <svg
        className="hero-bg__rings"
        viewBox="0 0 520 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="260" cy="260" r="248" stroke="currentColor" strokeWidth="1" />
        <circle cx="260" cy="260" r="200" stroke="currentColor" strokeWidth="1" />
        <circle cx="260" cy="260" r="152" stroke="currentColor" strokeWidth="1" />
        <circle cx="260" cy="260" r="104" stroke="currentColor" strokeWidth="1" />
        <circle cx="260" cy="260" r="56" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="260" cy="260" r="18" fill="currentColor" className="hero-bg__pupil" />
        <path
          d="M60 260 C120 120 400 120 460 260 C400 400 120 400 60 260 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
      </svg>
      <div className="hero-bg__shine" />
    </div>
  );
}

export function Hero() {
  const modalidades = site.turnosOnline
    ? 'Reservá tu turno online en pocos pasos o escribinos por WhatsApp.'
    : 'Coordiná tu turno por WhatsApp o teléfono, de forma rápida y sin esperas.';

  return (
    <section className="relative flex min-h-[88svh] items-center overflow-hidden bg-brand-50">
      <HeroBackground />

      <div className="page-shell relative z-10 py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">Oftalmología · {site.ciudad}</p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-brand-800 sm:text-5xl lg:text-6xl">
            {site.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-brand-600">
            {site.nombre}. Atención oftalmológica integral con tecnología de
            diagnóstico de última generación y un trato cercano en cada consulta.
          </p>
          <p className="mt-3 text-sm text-brand-500">{modalidades}</p>
          <TurnosCta className="mt-8" whatsappMensaje={site.whatsappMensaje} />
        </div>
      </div>
    </section>
  );
}

export default Hero;
