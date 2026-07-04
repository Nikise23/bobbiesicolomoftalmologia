import { useMemo, useState } from 'react';
import {
  toIsoDate,
  esFechaSeleccionable,
  tituloMes,
  MAX_DIAS,
} from '@/utils/fecha';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';

interface CalendarioProps {
  seleccionada: string | null;
  onSelect: (iso: string) => void;
  maxDias?: number;
}

const NOMBRES_DIA = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

/** Calendario lunes a sábado (sin domingos), hasta maxDias hacia adelante. */
export function Calendario({
  seleccionada,
  onSelect,
  maxDias = MAX_DIAS,
}: CalendarioProps) {
  const hoy = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [cursor, setCursor] = useState(() => new Date(hoy.getFullYear(), hoy.getMonth(), 1));

  const limite = useMemo(() => {
    const d = new Date(hoy);
    d.setDate(d.getDate() + maxDias);
    return d;
  }, [hoy, maxDias]);

  const puedeRetroceder =
    cursor.getFullYear() > hoy.getFullYear() ||
    (cursor.getFullYear() === hoy.getFullYear() && cursor.getMonth() > hoy.getMonth());

  const puedeAvanzar =
    cursor.getFullYear() < limite.getFullYear() ||
    (cursor.getFullYear() === limite.getFullYear() && cursor.getMonth() < limite.getMonth());

  const celdas = useMemo(() => {
    const anio = cursor.getFullYear();
    const mes = cursor.getMonth();
    const primerDia = new Date(anio, mes, 1);
    // Offset lunes = 0 ... domingo = 6
    const offset = (primerDia.getDay() + 6) % 7;
    const diasEnMes = new Date(anio, mes + 1, 0).getDate();

    const items: (Date | null)[] = [];
    for (let i = 0; i < offset; i++) items.push(null);
    for (let d = 1; d <= diasEnMes; d++) items.push(new Date(anio, mes, d));
    return items;
  }, [cursor]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          disabled={!puedeRetroceder}
          aria-label="Mes anterior"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-brand-600 transition-colors hover:bg-brand-200 disabled:opacity-30"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <p className="font-display font-semibold capitalize text-brand-700">
          {tituloMes(cursor.getFullYear(), cursor.getMonth())}
        </p>
        <button
          type="button"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          disabled={!puedeAvanzar}
          aria-label="Mes siguiente"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-brand-600 transition-colors hover:bg-brand-200 disabled:opacity-30"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-brand-400">
        {NOMBRES_DIA.map((d, i) => (
          <span key={i} className={i === 6 ? 'opacity-40' : ''}>
            {d}
          </span>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1">
        {celdas.map((dia, i) => {
          if (!dia) return <span key={`empty-${i}`} />;
          const iso = toIsoDate(dia);
          const seleccionable = esFechaSeleccionable(dia, maxDias);
          const activa = iso === seleccionada;
          return (
            <button
              key={iso}
              type="button"
              disabled={!seleccionable}
              aria-pressed={activa}
              onClick={() => onSelect(iso)}
              className={[
                'flex h-10 items-center justify-center rounded-lg text-sm transition-colors',
                activa
                  ? 'bg-accent-500 font-semibold text-white'
                  : seleccionable
                    ? 'text-brand-700 hover:bg-accent-500/20'
                    : 'cursor-not-allowed text-brand-300/50',
              ].join(' ')}
            >
              {dia.getDate()}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-brand-400">
        Atendemos de lunes a sábado. Podés reservar hasta {maxDias} días a futuro.
      </p>
    </div>
  );
}

export default Calendario;
