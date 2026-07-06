import { Link } from 'react-router-dom';
import logo from '@/assets/images/logo.webp';
import { site, whatsappUrl, mapsUrl } from '@/config/site';
import {
  PhoneIcon,
  MapPinIcon,
  WhatsAppIcon,
  InstagramIcon,
  FacebookIcon,
  ArrowRightIcon,
} from '@/components/icons';

export function Footer() {
  const year = new Date().getFullYear();
  const ctaTexto = site.turnosOnline
    ? 'Solicitá ahora tu turno online'
    : 'Coordiná tu turno con nosotros';

  return (
    <footer className="mt-auto">
      {/* Banda CTA dorada */}
      <section className="bg-gradient-to-r from-accent-600 via-accent-500 to-accent-700">
        <div className="page-shell py-12 text-center sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-900/70">
            Estamos para ayudarte
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold text-brand-900 sm:text-3xl">
            {ctaTexto}
          </h2>
          {site.turnosOnline ? (
            <Link
              to="/turnos"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-900 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-brand-700"
            >
              Solicitar turno
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          ) : (
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-900 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-brand-700"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Escribinos por WhatsApp
            </a>
          )}
        </div>
      </section>

      {/* Divisor de onda */}
      <div className="bg-gradient-to-r from-accent-600 via-accent-500 to-accent-700 leading-[0]">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="h-12 w-full sm:h-16"
          aria-hidden
        >
          <path
            d="M0,32 C240,80 480,80 720,48 C960,16 1200,16 1440,48 L1440,80 L0,80 Z"
            fill="#2f2216"
          />
        </svg>
      </div>

      {/* Footer oscuro */}
      <div className="bg-brand-900">
        <div className="page-shell grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt=""
                width={512}
                height={512}
                className="h-10 w-auto object-contain"
              />
              <span className="font-display text-lg font-bold text-accent-300">
                {site.nombreCorto}
              </span>
            </div>
            <p className="mt-4 text-sm text-white/60">{site.seo.descripcion}</p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Secciones
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>
                <a href="/#nosotros" className="hover:text-accent-300">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="/#profesionales" className="hover:text-accent-300">
                  Profesionales
                </a>
              </li>
              <li>
                <a href="/#estudios" className="hover:text-accent-300">
                  Estudios
                </a>
              </li>
              <li>
                <Link to="/cirugia" className="hover:text-accent-300">
                  Cirugía
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-accent-300">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li>
                <a
                  href={`tel:${site.telefono.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 hover:text-accent-300"
                >
                  <PhoneIcon className="h-4 w-4 shrink-0 text-accent-400" />
                  {site.telefono}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-accent-600 hover:text-accent-700"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={mapsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 hover:text-accent-300"
                >
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                  <span>
                    {site.direccion}
                    <br />
                    {site.ciudad}, {site.provincia}
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Seguinos
            </h3>
            <div className="mt-4 flex gap-3">
              {site.redes.instagram && (
                <a
                  href={site.redes.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-500/20 text-accent-300 transition-colors hover:bg-accent-500/40"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              )}
              {site.redes.facebook && (
                <a
                  href={site.redes.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-500/20 text-accent-300 transition-colors hover:bg-accent-500/40"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
              )}
            </div>
            <a
              href={site.sistemaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-xs font-medium text-white/40 hover:text-accent-300"
            >
              Acceso personal
            </a>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="page-shell py-5 text-center text-xs text-white/40">
            © {year} {site.nombre}. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
