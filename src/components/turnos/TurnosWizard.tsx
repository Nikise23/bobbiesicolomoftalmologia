import { useRef, useState } from 'react';
import { BarraProgreso } from './BarraProgreso';
import { PasoIdentificacion } from './PasoIdentificacion';
import { PasoProfesional } from './PasoProfesional';
import { Calendario } from './Calendario';
import { PasoHorario } from './PasoHorario';
import { PasoDatos } from './PasoDatos';
import { PasoConfirmacion } from './PasoConfirmacion';
import {
  datosVacios,
  etiquetasPasos,
  pasosPara,
  type DatosPaciente,
  type EstadoTurno,
  type PasoId,
  type TipoPaciente,
} from './tipos';
import { ChevronLeftIcon } from '@/components/icons';
import { formatearFechaLarga } from '@/utils/fecha';

/** Wizard de reserva que consume la API pública de turnos. */
export function TurnosWizard() {
  const [pasoIndex, setPasoIndex] = useState(0);
  const [estado, setEstado] = useState<EstadoTurno>({
    tipoPaciente: null,
    medico: null,
    fecha: null,
    hora: null,
    datos: datosVacios,
  });
  const [enviando, setEnviando] = useState(false);
  const [finalizado, setFinalizado] = useState(false);

  const validarDatosRef = useRef<() => boolean>(() => true);
  const validarIdentificacionRef = useRef<() => boolean>(() => true);
  const enviarRef = useRef<() => Promise<boolean>>(async () => true);

  const pasos = pasosPara(estado.tipoPaciente);
  const pasoId: PasoId = pasos[pasoIndex] ?? 'identificacion';
  const pasoNumero = pasoIndex + 1;

  const irAtras = () => setPasoIndex((i) => Math.max(0, i - 1));

  const irAdelante = async () => {
    if (pasoId === 'identificacion') {
      if (!validarIdentificacionRef.current()) return;
    }
    if (pasoId === 'datos') {
      if (!validarDatosRef.current()) return;
    }
    if (pasoId === 'confirmacion') {
      const ok = await enviarRef.current();
      if (ok) setFinalizado(true);
      return;
    }
    setPasoIndex((i) => Math.min(pasos.length - 1, i + 1));
  };

  const puedeAvanzar = () => {
    switch (pasoId) {
      case 'identificacion':
        return !!estado.tipoPaciente;
      case 'profesional':
        return !!estado.medico;
      case 'fecha':
        return !!estado.fecha;
      case 'horario':
        return !!estado.hora;
      default:
        return true;
    }
  };

  const setDatos = (datos: DatosPaciente) => setEstado((s) => ({ ...s, datos }));

  const setTipoPaciente = (tipo: TipoPaciente) => {
    setEstado((s) => ({
      ...s,
      tipoPaciente: tipo,
      datos:
        tipo === 'habitual'
          ? { ...datosVacios, dni: s.datos.dni }
          : { ...datosVacios },
    }));
  };

  const irAPaso = (numero: number) => {
    if (finalizado) return;
    setPasoIndex(Math.max(0, numero - 1));
  };

  return (
    <div className="turnos-panel">
      <div className="border-b border-brand-200 p-6 sm:px-8">
        <BarraProgreso
          pasos={etiquetasPasos(estado.tipoPaciente)}
          actual={pasoNumero}
          onIr={irAPaso}
        />
      </div>

      <div className="turnos-body">
        {pasoId === 'identificacion' && (
          <PasoIdentificacion
            tipo={estado.tipoPaciente}
            dni={estado.datos.dni}
            onTipoChange={setTipoPaciente}
            onDniChange={(dni) => setDatos({ ...estado.datos, dni })}
            registrarValidacion={(fn) => {
              validarIdentificacionRef.current = fn;
            }}
          />
        )}

        {pasoId === 'profesional' && (
          <PasoProfesional
            seleccionado={estado.medico}
            onSelect={(medico) =>
              setEstado((s) => ({ ...s, medico, hora: null }))
            }
          />
        )}

        {pasoId === 'fecha' && (
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
                medico={estado.medico}
                onSelect={(fecha) => setEstado((s) => ({ ...s, fecha, hora: null }))}
              />
            </div>
          </div>
        )}

        {pasoId === 'horario' && estado.medico && estado.fecha && (
          <PasoHorario
            medico={estado.medico}
            fecha={estado.fecha}
            seleccionado={estado.hora}
            onSelect={(hora) => setEstado((s) => ({ ...s, hora }))}
          />
        )}

        {pasoId === 'datos' && estado.tipoPaciente === 'nuevo' && (
          <PasoDatos
            tipoPaciente="nuevo"
            datos={estado.datos}
            onChange={setDatos}
            registrarValidacion={(fn) => {
              validarDatosRef.current = fn;
            }}
          />
        )}

        {pasoId === 'confirmacion' && (
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
            {pasoIndex > 0 ? (
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
              {pasoId === 'confirmacion'
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
