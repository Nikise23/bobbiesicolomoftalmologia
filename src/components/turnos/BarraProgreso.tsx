import { CheckIcon } from '@/components/icons';

interface BarraProgresoProps {
  /** Etiquetas de los pasos visibles. */
  pasos: string[];
  /** Paso actual (1-indexed). */
  actual: number;
  /** Ir a un paso ya completado. */
  onIr: (paso: number) => void;
}

/** Barra de progreso navegable hacia atrás. */
export function BarraProgreso({ pasos, actual, onIr }: BarraProgresoProps) {
  return (
    <ol className="flex items-center gap-1 sm:gap-2" aria-label="Progreso de la reserva">
      {pasos.map((label, i) => {
        const paso = i + 1;
        const completado = paso < actual;
        const activo = paso === actual;
        return (
          <li key={`${label}-${i}`} className="flex flex-1 items-center gap-1 sm:gap-2">
            <button
              type="button"
              disabled={paso >= actual}
              onClick={() => onIr(paso)}
              aria-current={activo ? 'step' : undefined}
              className={[
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors',
                completado
                  ? 'bg-accent-500 text-white hover:bg-accent-600'
                  : activo
                    ? 'bg-brand-700 text-white ring-2 ring-accent-500'
                    : 'bg-brand-200 text-brand-400',
              ].join(' ')}
            >
              {completado ? <CheckIcon className="h-4 w-4" /> : paso}
            </button>
            <span
              className={`hidden text-xs font-medium sm:block ${
                activo ? 'text-brand-700' : 'text-brand-400'
              }`}
            >
              {label}
            </span>
            {i < pasos.length - 1 && (
              <span
                className={`h-0.5 flex-1 rounded ${
                  completado ? 'bg-accent-500' : 'bg-brand-200'
                }`}
                aria-hidden
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default BarraProgreso;
