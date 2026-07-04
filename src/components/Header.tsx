import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { site } from '@/config/site';
import { MenuIcon, CloseIcon } from '@/components/icons';
import { TurnosCta } from '@/components/TurnosCta';

interface NavItem {
  label: string;
  to: string;
  /** true si es un anchor del home. */
  hash?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Nosotros', to: '/#nosotros', hash: true },
  { label: 'Profesionales', to: '/#profesionales', hash: true },
  { label: 'Estudios', to: '/#estudios', hash: true },
  { label: 'Cirugía', to: '/cirugia' },
  { label: 'Contacto', to: '/contacto' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-200 bg-brand-50/95 backdrop-blur">
      <div className="page-shell flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link to="/" className="flex items-center gap-3" aria-label={`Inicio · ${site.nombre}`}>
          <img
            src="/logo.png"
            alt=""
            width={1024}
            height={682}
            className="h-10 w-auto object-contain sm:h-11"
          />
          <span className="flex flex-col leading-tight">
            <span className="text-xs font-medium uppercase tracking-widest text-brand-500">
              Consultorio
            </span>
            <span className="font-display text-base font-bold text-accent-600 sm:text-lg">
              {site.nombreCorto}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegación principal">
          {navItems.map((item) =>
            item.hash ? (
              <a
                key={item.to}
                href={item.to}
                className="text-sm font-medium text-brand-600 transition-colors hover:text-accent-600"
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-accent-600 ${
                    isActive ? 'text-accent-600' : 'text-brand-600'
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <TurnosCta mostrarWhatsapp={false} />
          <a
            href={site.sistemaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-brand-400 transition-colors hover:text-accent-600"
          >
            Acceso personal
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-brand-700 lg:hidden"
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-brand-200 bg-white lg:hidden"
        >
          <nav className="page-shell flex flex-col py-4" aria-label="Navegación móvil">
            {navItems.map((item) =>
              item.hash ? (
                <a
                  key={item.to}
                  href={item.to}
                  className="flex min-h-[44px] items-center text-base font-medium text-brand-700"
                >
                  {item.label}
                </a>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="flex min-h-[44px] items-center text-base font-medium text-brand-700"
                >
                  {item.label}
                </NavLink>
              )
            )}
            <div className="mt-3 border-t border-brand-200 pt-4">
              <TurnosCta />
            </div>
            <a
              href={site.sistemaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex min-h-[44px] items-center text-sm font-medium text-brand-400"
            >
              Acceso personal
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
