import { Link } from 'react-router-dom';
import { site, whatsappUrl } from '@/config/site';
import { WhatsAppIcon, InstagramIcon, ArrowRightIcon } from '@/components/icons';

interface TurnosCtaProps {
  /** Mensaje precargado de WhatsApp específico de la sección. */
  whatsappMensaje?: string;
  /** Clase para el contenedor de botones. */
  className?: string;
  /** Muestra los íconos de redes (WhatsApp + Instagram). */
  mostrarWhatsapp?: boolean;
}

const socialIconClass =
  'inline-flex h-12 w-12 items-center justify-center rounded-lg border border-accent-500 bg-white text-accent-600 shadow-sm transition-colors duration-200 hover:bg-accent-500/10 focus-visible:ring-2 focus-visible:ring-accent-400';

/**
 * CTAs de turnos que respetan el feature flag VITE_TURNOS_ONLINE:
 *  - Encendido: "Solicitar turno" → /turnos (wizard) + íconos de redes.
 *  - Apagado: "Solicitar turno" → WhatsApp (estilo del sitio), sin wizard.
 */
export function TurnosCta({
  whatsappMensaje,
  className = '',
  mostrarWhatsapp = true,
}: TurnosCtaProps) {
  const wa = whatsappUrl(whatsappMensaje);

  if (!site.turnosOnline) {
    return (
      <div className={`flex flex-wrap items-center gap-3 ${className}`}>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Solicitar turno por WhatsApp
        </a>
        {site.redes.instagram && (
          <a
            href={site.redes.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={socialIconClass}
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <Link to="/turnos" className="btn-primary">
        Solicitar turno
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
      {mostrarWhatsapp && (
        <>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className={socialIconClass}
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          {site.redes.instagram && (
            <a
              href={site.redes.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={socialIconClass}
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          )}
        </>
      )}
    </div>
  );
}

export default TurnosCta;
