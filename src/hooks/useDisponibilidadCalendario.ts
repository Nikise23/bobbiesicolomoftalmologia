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

      const conTurno: string[] = [];
      let consultasOk = 0;
      let consultasAuth = 0;
      let consultasTotal = 0;
      let primerErrorAuth: string | null = null;
      let primerErrorOtro: string | null = null;
      const lote = 6;

      try {
        for (let i = 0; i < fechasAConsultar.length; i += lote) {
          if (controller.signal.aborted) return;
          const chunk = fechasAConsultar.slice(i, i + lote);
          const resultados = await Promise.allSettled(
            chunk.map(async (fecha) => {
              const horarios = await getDisponibilidad(
                medico,
                fecha,
                controller.signal
              );
              return horarios.length > 0 ? fecha : null;
            })
          );

          for (const resultado of resultados) {
            consultasTotal++;
            if (resultado.status === 'fulfilled') {
              consultasOk++;
              if (resultado.value) conTurno.push(resultado.value);
            } else {
              const parsed = parseApiError(resultado.reason);
              if (parsed.status === 401 || parsed.status === 403) {
                consultasAuth++;
                primerErrorAuth ??= parsed.message;
              } else {
                primerErrorOtro ??= parsed.message;
              }
            }
          }
        }

        if (!activo) return;

        if (conTurno.length > 0) {
          setDiasConTurno(new Set(conTurno));
          return;
        }

        // Sin días libres pero la API respondió bien
        if (consultasOk > 0 && consultasAuth === 0) {
          setDiasConTurno(new Set());
          return;
        }

        // Falló todo por auth (típico: falta VITE_PUBLIC_API_KEY en producción)
        if (consultasAuth > 0 && consultasAuth === consultasTotal) {
          setError(primerErrorAuth);
          setUsarFallback(true);
          setDiasConTurno(new Set(fechasAConsultar));
          return;
        }

        // Otro error de red/servidor: fallback silencioso
        if (primerErrorOtro) {
          setError(primerErrorOtro);
          setUsarFallback(true);
          setDiasConTurno(new Set(fechasAConsultar));
        }
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
