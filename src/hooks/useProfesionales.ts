import { useEffect, useState } from 'react';
import { fotosProfesionales } from '@/assets/images';
import profesionalPlaceholder from '@/assets/images/profesional-placeholder.svg';
import { getMedicos } from '@/services/publicApi';
import profesionalesLocal from '@/data/profesionales.json';

export interface ProfesionalOverride {
  medicoNombre: string;
  especialidad?: string;
  resena?: string;
  foto?: string;
  orden?: number;
  visible?: boolean;
}

export interface Profesional {
  nombre: string;
  especialidad: string;
  resena: string;
  foto: string;
  orden: number;
  /** true si el nombre vino de la API pública. */
  desdeApi: boolean;
}

const overrides = profesionalesLocal as ProfesionalOverride[];

const FOTO_PLACEHOLDER = profesionalPlaceholder;

function construirDesdeOverride(o: ProfesionalOverride, desdeApi: boolean): Profesional {
  return {
    nombre: o.medicoNombre,
    especialidad: o.especialidad ?? 'Oftalmología',
    resena: o.resena ?? '',
    foto: fotosProfesionales[o.medicoNombre] ?? o.foto ?? FOTO_PLACEHOLDER,
    orden: o.orden ?? 999,
    desdeApi,
  };
}

/** Solo overrides visibles (fallback total cuando la API falla). */
function fallbackLocal(): Profesional[] {
  return overrides
    .filter((o) => o.visible !== false)
    .map((o) => construirDesdeOverride(o, false))
    .sort((a, b) => a.orden - b.orden);
}

/**
 * Mergea la lista de médicos de la API pública con los overrides locales
 * (foto, reseña, especialidad, orden, visible) por nombre exacto.
 * Si la API falla, cae al JSON local completo.
 */
export function useProfesionales() {
  const [profesionales, setProfesionales] = useState<Profesional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let activo = true;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const nombresApi = await getMedicos(controller.signal);
        if (!activo) return;

        const mapOverrides = new Map(
          overrides.map((o) => [o.medicoNombre.trim(), o])
        );

        const lista = nombresApi
          .map((nombre) => {
            const override = mapOverrides.get(nombre.trim());
            if (override?.visible === false) return null;
            return construirDesdeOverride(
              { ...override, medicoNombre: nombre },
              true
            );
          })
          .filter((p): p is Profesional => p !== null)
          .sort((a, b) => a.orden - b.orden);

        setProfesionales(lista.length > 0 ? lista : fallbackLocal());
      } catch (err) {
        if (!activo || controller.signal.aborted) return;
        // Fallback total al JSON local, pero registramos el error para accesibilidad.
        setError('No pudimos actualizar la lista desde el sistema de turnos.');
        setProfesionales(fallbackLocal());
      } finally {
        if (activo) setLoading(false);
      }
    })();

    return () => {
      activo = false;
      controller.abort();
    };
  }, []);

  return { profesionales, loading, error };
}
