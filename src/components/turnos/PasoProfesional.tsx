import { useProfesionales, agendaComoItems } from '@/hooks/useProfesionales';
import { onImageError } from '@/utils/imagen';
import { whatsappUrl } from '@/config/site';

interface PasoProfesionalProps {
  seleccionado: string | null;
  onSelect: (medico: string) => void;
}

/** Paso 1: elegir profesional (GET /medicos + fotos/reseñas del JSON local). */
export function PasoProfesional({ seleccionado, onSelect }: PasoProfesionalProps) {
  const { profesionales, loading, error } = useProfesionales();

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-brand-700">
        Elegí un profesional
      </h2>
      <p className="mt-1 text-sm text-brand-500">
        Seleccioná con quién querés atenderte.
      </p>

      <div aria-live="polite" className="mt-6">
        {loading && <p className="text-sm text-brand-500">Cargando profesionales…</p>}

        {error && (
          <p role="alert" className="mb-4 text-sm text-accent-700">
            {error}
          </p>
        )}

        {!loading && profesionales.length === 0 && (
          <div role="alert" className="rounded-xl bg-brand-200 p-4 text-sm text-brand-600">
            No pudimos cargar la lista de profesionales.{' '}
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent-700 underline"
            >
              Escribinos por WhatsApp
            </a>{' '}
            para coordinar tu turno.
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {profesionales.map((pro) => {
            const activo = pro.medicoApi === seleccionado;
            const dias = agendaComoItems(pro.agenda);
            return (
              <button
                key={pro.medicoApi}
                type="button"
                onClick={() => onSelect(pro.medicoApi)}
                aria-pressed={activo}
                className={[
                  'flex items-start gap-4 rounded-2xl border p-4 text-left transition-colors',
                  activo
                    ? 'border-accent-500 bg-accent-500/10'
                    : 'border-brand-200 bg-white hover:border-accent-400',
                ].join(' ')}
              >
                <img
                  src={pro.foto}
                  alt=""
                  width={64}
                  height={80}
                  loading="lazy"
                  className={`h-16 w-14 shrink-0 rounded-lg object-cover ${pro.fotoClase ?? ''}`}
                  onError={onImageError}
                />
                <span className="min-w-0">
                  <span className="block font-display font-bold text-brand-700">
                    {pro.nombre}
                  </span>
                  <span className="block text-xs font-medium uppercase tracking-wide text-brand-400">
                    {pro.especialidad}
                  </span>
                  {dias.length > 0 && (
                    <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-xs leading-snug text-brand-500">
                      {dias.map((dia) => (
                        <li key={dia}>{dia}</li>
                      ))}
                    </ul>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PasoProfesional;
