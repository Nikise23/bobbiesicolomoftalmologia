import { Link } from 'react-router-dom';
import { site, whatsappUrl } from '@/config/site';
import { WhatsAppIcon, ArrowRightIcon } from '@/components/icons';

interface TurnosCtaProps {
  /** Mensaje precargado de WhatsApp específico de la sección. */
  whatsappMensaje?: string;
  /** Clase para el contenedor de botones. */
  className?: string;
  /** Muestra el botón de WhatsApp además del principal. */
  mostrarWhatsapp?: boolean;
}

/**
 * CTAs de turnos que respetan el feature flag VITE_TURNOS_ONLINE:
 *  - Encendido: "Solicitar turno" → /turnos (wizard) + WhatsApp secundario.
 *  - Apagado: "Solicitar turno" → WhatsApp (verde), sin wizard.
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
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
        >
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp
        </a>
      )}
    </div>
  );
}

export default TurnosCta;
