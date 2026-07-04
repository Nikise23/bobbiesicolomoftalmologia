import fachada from '@/assets/images/fachada.jpg';
import { site, mapsUrl } from '@/config/site';
import { onImageError } from '@/utils/imagen';
import { MapPinIcon } from '@/components/icons';

interface UbicacionProps {
  className?: string;
}

/**
 * Tarjeta unificada de ubicación: fachada + mapa (o botón a Google Maps) + dirección.
 */
export function UbicacionConsultorio({ className = '' }: UbicacionProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-lg ${className}`}
    >
      <img
        src={fachada}
        alt={`Fachada del consultorio ${site.nombreCorto} — ${site.direccion}`}
        width={720}
        height={480}
        loading="lazy"
        className="aspect-[16/10] w-full object-cover"
        onError={onImageError}
      />

      {site.mapsEmbedUrl ? (
        <iframe
          title={`Ubicación de ${site.nombreCorto} en Google Maps`}
          src={site.mapsEmbedUrl}
          className="aspect-[4/3] w-full border-0 border-t border-brand-200"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="flex flex-col items-center gap-3 border-t border-brand-200 bg-brand-50 px-6 py-6 text-center">
          <MapPinIcon className="h-8 w-8 text-accent-500" aria-hidden />
          <p className="text-sm text-brand-600">
            Encontranos en {site.direccion}, {site.ciudad}.
          </p>
          <a
            href={mapsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Ver en Google Maps
          </a>
        </div>
      )}

      <div className="flex items-center justify-between gap-4 border-t border-brand-200 p-5">
        <div>
          <p className="font-display font-semibold text-brand-700">{site.direccion}</p>
          <p className="text-sm text-brand-500">
            {site.ciudad}, {site.provincia}
          </p>
        </div>
        <a
          href={mapsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-sm font-semibold text-accent-600 hover:text-accent-500"
        >
          Cómo llegar
        </a>
      </div>
    </div>
  );
}

export default UbicacionConsultorio;
