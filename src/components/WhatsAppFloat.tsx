import { site, whatsappUrl } from '@/config/site';
import { WhatsAppIcon } from '@/components/icons';

/** Botón flotante fijo de WhatsApp (abajo a la derecha). */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Escribinos por WhatsApp a ${site.nombreCorto}`}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent-600 text-white shadow-lg transition-all duration-200 hover:scale-110 hover:bg-accent-700 focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-50"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

export default WhatsAppFloat;
