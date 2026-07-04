import { useEffect, useMemo, useState } from 'react';
import { getDisponibilidad, parseApiError } from '@/services/publicApi';
import { esFechaSeleccionable, toIsoDate, MAX_DIAS } from '@/utils/fecha';

/**
 * Consulta GET /disponibilidad para cada día hábil del mes visible
 * y devuelve las fechas con al menos un horario libre para el médico.
 */
export function useDisponibilidadCalendario(
  medico: string | null,
  anio: number,
  mes: number,
  maxDias = MAX_DIAS
) {
  const [diasConTurno, setDiasConTurno] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usarFallback, setUsarFallback] = useState(false);

  const fechasAConsultar = useMemo(() => {
    const fechas: string[] = [];
    const diasEnMes = new Date(anio, mes + 1, 0).getDate();
    for (let d = 1; d <= diasEnMes; d++) {
      const date = new Date(anio, mes, d);
      if (esFechaSeleccionable(date, maxDias)) {
        fechas.push(toIsoDate(date));
      }
    }
    return fechas;
  }, [anio, mes, maxDias]);

  useEffect(() => {
    if (!medico || fechasAConsultar.length === 0) {
      setDiasConTurno(new Set());
      setLoading(false);
      setError(null);
      setUsarFallback(false);
      return;
    }

    const controller = new AbortController();
    let activo = true;

    (async () => {
      setLoading(true);
      setError(null);
      setUsarFallback(false);

      try {
        const conTurno: string[] = [];
        const lote = 6;

        for (let i = 0; i < fechasAConsultar.length; i += lote) {
          if (controller.signal.aborted) return;
          const chunk = fechasAConsultar.slice(i, i + lote);
          const resultados = await Promise.all(
            chunk.map(async (fecha) => {
              const horarios = await getDisponibilidad(
                medico,
                fecha,
                controller.signal
              );
              return horarios.length > 0 ? fecha : null;
            })
          );
          for (const fecha of resultados) {
            if (fecha) conTurno.push(fecha);
          }
        }

        if (activo) setDiasConTurno(new Set(conTurno));
      } catch (err) {
        if (!activo || controller.signal.aborted) return;
        const parsed = parseApiError(err);
        setError(parsed.message);
        // Si falla la API, dejamos elegir días hábiles y validamos en el paso de horario.
        setUsarFallback(true);
        setDiasConTurno(new Set(fechasAConsultar));
      } finally {
        if (activo) setLoading(false);
      }
    })();

    return () => {
      activo = false;
      controller.abort();
    };
  }, [medico, fechasAConsultar]);

  return { diasConTurno, loading, error, usarFallback };
}
