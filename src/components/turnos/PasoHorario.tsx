import { useEffect, useState } from 'react';
import { getDisponibilidad, parseApiError } from '@/services/publicApi';
import { formatearFechaLarga } from '@/utils/fecha';
import { whatsappUrl } from '@/config/site';

interface PasoHorarioProps {
  medico: string;
  fecha: string;
  seleccionado: string | null;
  onSelect: (hora: string) => void;
}

/** Paso 3: slots libres desde GET /disponibilidad. */
export function PasoHorario({ medico, fecha, seleccionado, onSelect }: PasoHorarioProps) {
  const [horarios, setHorarios] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fallbackWa, setFallbackWa] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let activo = true;

    (async () => {
      setLoading(true);
      setError(null);
      setFallbackWa(false);
      try {
        const libres = await getDisponibilidad(medico, fecha, controller.signal);
        if (activo) setHorarios(libres);
      } catch (err) {
        if (!activo || controller.signal.aborted) return;
        const parsed = parseApiError(err);
        setError(parsed.message);
        setFallbackWa(parsed.fallbackWhatsapp);
      } finally {
        if (activo) setLoading(false);
      }
    })();

    return () => {
      activo = false;
      controller.abort();
    };
  }, [medico, fecha]);

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-brand-700">Elegí un horario</h2>
      <p className="mt-1 text-sm capitalize text-brand-500">
        {medico} · {formatearFechaLarga(fecha)}
      </p>

      <div aria-live="polite" className="mt-6">
        {loading && <p className="text-sm text-brand-500">Buscando horarios disponibles…</p>}

        {error && (
          <div role="alert" className="rounded-xl bg-brand-200 p-4 text-sm text-brand-600">
            {error}
            {fallbackWa && (
              <>
                {' '}
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent-700 underline"
                >
                  Coordiná por WhatsApp
                </a>
                .
              </>
            )}
          </div>
        )}

        {!loading && !error && horarios.length === 0 && (
          <div role="alert" className="rounded-xl bg-brand-200 p-4 text-sm text-brand-600">
            No hay horarios disponibles para esta fecha. Probá con otro día o{' '}
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent-700 underline"
            >
              escribinos por WhatsApp
            </a>
            .
          </div>
        )}

        {!loading && horarios.length > 0 && (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {horarios.map((hora) => {
              const activo = hora === seleccionado;
              return (
                <button
                  key={hora}
                  type="button"
                  onClick={() => onSelect(hora)}
                  aria-pressed={activo}
                  className={[
                    'rounded-lg border py-2.5 text-sm font-semibold transition-colors',
                    activo
                      ? 'border-accent-500 bg-accent-500 text-white'
                      : 'border-brand-200 bg-white text-brand-700 hover:border-accent-400',
                  ].join(' ')}
                >
                  {hora}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default PasoHorario;
