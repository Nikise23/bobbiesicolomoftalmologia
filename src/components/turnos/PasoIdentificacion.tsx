import { useState } from 'react';
import type { TipoPaciente } from './tipos';
import { validarDni } from '@/utils/validaciones';

interface PasoIdentificacionProps {
  tipo: TipoPaciente | null;
  dni: string;
  onTipoChange: (tipo: TipoPaciente) => void;
  onDniChange: (dni: string) => void;
  registrarValidacion: (fn: () => boolean) => void;
}

/** Paso 1: paciente habitual (solo DNI) o paciente nuevo (datos completos más adelante). */
export function PasoIdentificacion({
  tipo,
  dni,
  onTipoChange,
  onDniChange,
  registrarValidacion,
}: PasoIdentificacionProps) {
  const [errorDni, setErrorDni] = useState<string | null>(null);

  registrarValidacion(() => {
    if (!tipo) return false;
    if (tipo === 'habitual') {
      if (!validarDni(dni)) {
        setErrorDni('Ingresá un DNI válido (7 u 8 dígitos).');
        return false;
      }
      setErrorDni(null);
    }
    return true;
  });

  const opcionClass = (activo: boolean) =>
    [
      'rounded-2xl border p-4 text-left transition-colors',
      activo
        ? 'border-accent-500 bg-accent-500/10 ring-1 ring-accent-500'
        : 'border-brand-200 bg-white hover:border-accent-400',
    ].join(' ');

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-brand-700">
        ¿Ya te atendiste con nosotros?
      </h2>
      <p className="mt-1 text-sm text-brand-500">
        Elegí una opción para continuar con tu reserva.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onTipoChange('habitual')}
          aria-pressed={tipo === 'habitual'}
          className={opcionClass(tipo === 'habitual')}
        >
          <span className="block font-display font-bold text-brand-700">
            Ya soy paciente
          </span>
          <span className="mt-1 block text-sm text-brand-500">
            Solo necesitamos tu DNI para reservar el turno.
          </span>
        </button>

        <button
          type="button"
          onClick={() => onTipoChange('nuevo')}
          aria-pressed={tipo === 'nuevo'}
          className={opcionClass(tipo === 'nuevo')}
        >
          <span className="block font-display font-bold text-brand-700">
            Soy paciente nuevo
          </span>
          <span className="mt-1 block text-sm text-brand-500">
            Completarás tus datos personales en un paso posterior.
          </span>
        </button>
      </div>

      {tipo === 'habitual' && (
        <div className="mt-6 max-w-sm">
          <label htmlFor="dni-habitual" className="label-field">
            DNI
          </label>
          <input
            id="dni-habitual"
            className="input-field"
            value={dni}
            onChange={(e) => {
              setErrorDni(null);
              onDniChange(e.target.value.replace(/\D/g, '').slice(0, 8));
            }}
            inputMode="numeric"
            placeholder="12345678"
            autoComplete="off"
            aria-invalid={!!errorDni}
            aria-describedby={errorDni ? 'dni-habitual-error' : 'dni-habitual-hint'}
          />
          {errorDni ? (
            <p id="dni-habitual-error" role="alert" className="mt-1 text-xs text-red-600">
              {errorDni}
            </p>
          ) : (
            <p id="dni-habitual-hint" className="mt-2 text-xs text-brand-500">
              Si ya figura en nuestro sistema, con este DNI alcanza para confirmar el
              turno sin volver a cargar tus datos.
            </p>
          )}
        </div>
      )}

      {tipo === 'nuevo' && (
        <p className="mt-6 rounded-xl bg-brand-100 px-4 py-3 text-sm text-brand-600">
          Primero elegí profesional, fecha y horario. Después te pediremos nombre,
          DNI, celular y obra social para darte de alta.
        </p>
      )}
    </div>
  );
}

export default PasoIdentificacion;
