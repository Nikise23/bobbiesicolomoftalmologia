import { useRef, useState } from 'react';
import { BarraProgreso } from './BarraProgreso';
import { PasoProfesional } from './PasoProfesional';
import { Calendario } from './Calendario';
import { PasoHorario } from './PasoHorario';
import { PasoDatos } from './PasoDatos';
import { PasoConfirmacion } from './PasoConfirmacion';
import { datosVacios, PASOS, type DatosPaciente, type EstadoTurno } from './tipos';
import { ChevronLeftIcon } from '@/components/icons';
import { formatearFechaLarga } from '@/utils/fecha';

/** Wizard de 5 pasos que consume la API pública de turnos. */
export function TurnosWizard() {
  const [paso, setPaso] = useState(1);
  const [estado, setEstado] = useState<EstadoTurno>({
    medico: null,
    fecha: null,
    hora: null,
    datos: datosVacios,
  });
  const [enviando, setEnviando] = useState(false);
  const [finalizado, setFinalizado] = useState(false);

  const validarDatosRef = useRef<() => boolean>(() => true);
  const enviarRef = useRef<() => Promise<boolean>>(async () => true);

  const irAtras = () => setPaso((p) => Math.max(1, p - 1));

  const irAdelante = async () => {
    if (paso === 4) {
      if (!validarDatosRef.current()) return;
    }
    if (paso === 5) {
      const ok = await enviarRef.current();
      if (ok) setFinalizado(true);
      return;
    }
    setPaso((p) => Math.min(PASOS.length, p + 1));
  };

  const puedeAvanzar = () => {
    switch (paso) {
      case 1:
        return !!estado.medico;
      case 2:
        return !!estado.fecha;
      case 3:
        return !!estado.hora;
      default:
        return true;
    }
  };

  const setDatos = (datos: DatosPaciente) => setEstado((s) => ({ ...s, datos }));

  return (
    <div className="turnos-panel">
      <div className="border-b border-brand-200 p-6 sm:px-8">
        <BarraProgreso actual={paso} onIr={(p) => !finalizado && setPaso(p)} />
      </div>

      <div className="turnos-body">
        {paso === 1 && (
          <PasoProfesional
            seleccionado={estado.medico}
            onSelect={(medico) =>
              setEstado((s) => ({ ...s, medico, hora: null }))
            }
          />
        )}

        {paso === 2 && (
          <div>
            <h2 className="font-display text-xl font-bold text-brand-700">
              Elegí una fecha
            </h2>
            {estado.fecha && (
              <p className="mt-1 text-sm capitalize text-brand-500">
                {formatearFechaLarga(estado.fecha)}
              </p>
            )}
            <div className="mt-6 max-w-md">
              <Calendario
                seleccionada={estado.fecha}
                onSelect={(fecha) => setEstado((s) => ({ ...s, fecha, hora: null }))}
              />
            </div>
          </div>
        )}

        {paso === 3 && estado.medico && estado.fecha && (
          <PasoHorario
            medico={estado.medico}
            fecha={estado.fecha}
            seleccionado={estado.hora}
            onSelect={(hora) => setEstado((s) => ({ ...s, hora }))}
          />
        )}

        {paso === 4 && (
          <PasoDatos
            datos={estado.datos}
            onChange={setDatos}
            registrarValidacion={(fn) => {
              validarDatosRef.current = fn;
            }}
          />
        )}

        {paso === 5 && (
          <PasoConfirmacion
            estado={estado}
            registrarEnvio={(fn) => {
              enviarRef.current = fn;
            }}
            onEstadoEnvio={setEnviando}
          />
        )}

        {!finalizado && (
          <div className="mt-8 flex items-center justify-between gap-3">
            {paso > 1 ? (
              <button
                type="button"
                onClick={irAtras}
                disabled={enviando}
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-500 transition-colors hover:text-brand-700 disabled:opacity-50"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                Atrás
              </button>
            ) : (
              <span />
            )}

            <button
              type="button"
              onClick={irAdelante}
              disabled={!puedeAvanzar() || enviando}
              className="btn-primary"
            >
              {paso === 5
                ? enviando
                  ? 'Confirmando…'
                  : 'Confirmar turno'
                : 'Continuar'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TurnosWizard;
