import { useEffect, useMemo, useState } from 'react';
import { getDisponibilidadRango, parseApiError } from '@/services/publicApi';
import { esFechaSeleccionable, toIsoDate, MAX_DIAS } from '@/utils/fecha';

/**
 * Consulta GET /disponibilidad-rango para el mes visible
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

  const rango = useMemo(() => {
    const fechas: string[] = [];
    const diasEnMes = new Date(anio, mes + 1, 0).getDate();
    for (let d = 1; d <= diasEnMes; d++) {
      const date = new Date(anio, mes, d);
      if (esFechaSeleccionable(date, maxDias)) {
        fechas.push(toIsoDate(date));
      }
    }
    if (fechas.length === 0) return null;
    return { desde: fechas[0], hasta: fechas[fechas.length - 1], fechas };
  }, [anio, mes, maxDias]);

  useEffect(() => {
    if (!medico || !rango) {
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
        let dias;
        try {
          dias = await getDisponibilidadRango(
            medico,
            rango.desde,
            rango.hasta,
            controller.signal
          );
        } catch (err) {
          // El backend usa fecha UTC: de noche (UTC-3) "hoy" ya es pasado para el
          // servidor y rechaza el rango. Reintentamos desde el día siguiente.
          const parsed = parseApiError(err);
          const esFechaPasada =
            parsed.status === 400 && /pasad/i.test(parsed.message);
          if (esFechaPasada && rango.fechas.length > 1) {
            dias = await getDisponibilidadRango(
              medico,
              rango.fechas[1],
              rango.hasta,
              controller.signal
            );
          } else {
            throw err;
          }
        }

        if (!activo) return;

        const conTurno = dias
          .filter((d) => d.horarios_disponibles.length > 0)
          .map((d) => d.fecha);

        setDiasConTurno(new Set(conTurno));
      } catch (err) {
        if (!activo || controller.signal.aborted) return;

        const parsed = parseApiError(err);
        setError(parsed.message);

        if (parsed.status === 401 || parsed.status === 403 || parsed.fallbackWhatsapp) {
          setUsarFallback(true);
          setDiasConTurno(new Set(rango.fechas));
        } else {
          setDiasConTurno(new Set());
        }
      } finally {
        if (activo) setLoading(false);
      }
    })();

    return () => {
      activo = false;
      controller.abort();
    };
  }, [medico, rango]);

  return { diasConTurno, loading, error, usarFallback };
}
