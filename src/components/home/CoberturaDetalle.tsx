import { useEffect } from 'react';
import type { CoberturaMedica } from '@/data/coberturas';
import { mensajeWhatsappCobertura } from '@/data/coberturas';
import { whatsappUrl } from '@/config/site';
import { CloseIcon, WhatsAppIcon } from '@/components/icons';
import { onImageError } from '@/utils/imagen';

interface CoberturaDetalleProps {
  cobertura: CoberturaMedica;
  onCerrar: () => void;
}

/** Modal con planes, descripción y enlace a WhatsApp. */
export function CoberturaDetalle({ cobertura, onCerrar }: CoberturaDetalleProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCerrar();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onCerrar]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cobertura-titulo"
    >
      <button
        type="button"
        className="absolute inset-0 bg-brand-900/50 backdrop-blur-sm"
        aria-label="Cerrar"
        onClick={onCerrar}
      />

      <div className="relative w-full max-w-md animate-fade-in rounded-2xl border border-brand-200 bg-white p-6 shadow-xl sm:p-7">
        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar detalle"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-brand-500 transition-colors hover:bg-brand-100"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <div className="flex items-start gap-4 pr-8">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-brand-200 bg-brand-50 p-2">
            <img
              src={cobertura.logo}
              alt=""
              width={48}
              height={48}
              className="max-h-10 w-full object-contain"
              onError={onImageError}
            />
          </div>
          <div>
            <h3 id="cobertura-titulo" className="font-display text-xl font-bold text-brand-700">
              {cobertura.nombre}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-500">{cobertura.descripcion}</p>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-400">Planes</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {cobertura.planes.map((plan) => (
              <a
                key={plan}
                href={whatsappUrl(mensajeWhatsappCobertura(cobertura, plan))}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-brand-300 bg-white px-3.5 py-1.5 text-sm font-medium text-brand-700 transition-colors hover:border-accent-400 hover:bg-accent-500/10"
              >
                {plan}
              </a>
            ))}
          </div>
        </div>

        <a
          href={whatsappUrl(mensajeWhatsappCobertura(cobertura))}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp mt-6 w-full"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  );
}

export default CoberturaDetalle;
