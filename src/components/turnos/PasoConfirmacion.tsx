import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { EstadoTurno } from './tipos';
import {
  crearTurno,
  getTurnosPaciente,
  parseApiError,
  type ReservaTurno,
  type TurnoPaciente,
} from '@/services/publicApi';
import { formatearFechaLarga } from '@/utils/fecha';
import { whatsappUrl } from '@/config/site';
import { CheckIcon, WhatsAppIcon } from '@/components/icons';

interface PasoConfirmacionProps {
  estado: EstadoTurno;
  /** Registra la función de envío para el botón "Confirmar turno" del contenedor. */
  registrarEnvio: (fn: () => Promise<boolean>) => void;
  onEstadoEnvio: (enviando: boolean) => void;
}

function construirBody(estado: EstadoTurno): ReservaTurno {
  const { datos, tipoPaciente } = estado;
  const base: ReservaTurno = {
    medico: estado.medico!,
    fecha: estado.fecha!,
    hora: estado.hora!,
    dni: datos.dni.trim(),
  };

  if (tipoPaciente === 'habitual') {
    return base;
  }

  return {
    ...base,
    nombre: datos.nombre.trim(),
    apellido: datos.apellido.trim(),
    celular: datos.celular.replace(/\D/g, ''),
    obra_social: datos.obraSocial.trim(),
    numero_obra_social: datos.numeroObraSocial.trim(),
    fecha_nacimiento: datos.fechaNacimiento.trim(),
  };
}

export function PasoConfirmacion({
  estado,
  registrarEnvio,
  onEstadoEnvio,
}: PasoConfirmacionProps) {
  const [exito, setExito] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fallbackWa, setFallbackWa] = useState(false);
  const [misTurnos, setMisTurnos] = useState<TurnoPaciente[] | null>(null);
  const [cargandoTurnos, setCargandoTurnos] = useState(false);

  registrarEnvio(async () => {
    setError(null);
    setFallbackWa(false);
    onEstadoEnvio(true);
    try {
      await crearTurno(construirBody(estado));
      setExito(true);
      onEstadoEnvio(false);
      return true;
    } catch (err) {
      const parsed = parseApiError(err);
      let msg = parsed.message;
      if (
        estado.tipoPaciente === 'habitual' &&
        (parsed.status === 400 || msg.toLowerCase().includes('dni'))
      ) {
        msg =
          'No encontramos ese DNI en el sistema. Volvé atrás, elegí "Soy paciente nuevo" y completá tus datos.';
      }
      setError(msg);
      setFallbackWa(parsed.fallbackWhatsapp);
      onEstadoEnvio(false);
      return false;
    }
  });

  const verMisTurnos = async () => {
    setCargandoTurnos(true);
    try {
      const turnos = await getTurnosPaciente(estado.datos.dni.trim(), true);
      setMisTurnos(turnos);
    } catch {
      setMisTurnos([]);
    } finally {
      setCargandoTurnos(false);
    }
  };

  if (exito) {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-500/20 text-accent-600">
          <CheckIcon className="h-8 w-8" />
        </div>
        <h2 className="mt-4 font-display text-2xl font-bold text-brand-700">
          ¡Turno confirmado!
        </h2>
        <p className="mt-2 text-sm text-brand-500">
          Te esperamos. Guardá los datos de tu turno.
        </p>

        <dl className="mx-auto mt-6 max-w-sm space-y-2 rounded-xl bg-white p-5 text-left text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-brand-400">Profesional</dt>
            <dd className="font-semibold text-brand-700">{estado.medico}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-brand-400">Fecha</dt>
            <dd className="font-semibold capitalize text-brand-700">
              {formatearFechaLarga(estado.fecha!)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-brand-400">Hora</dt>
            <dd className="font-semibold text-brand-700">{estado.hora}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={verMisTurnos}
            disabled={cargandoTurnos}
            className="text-sm font-semibold text-accent-700 underline disabled:opacity-60"
          >
            {cargandoTurnos ? 'Cargando…' : 'Ver mis turnos'}
          </button>

          {misTurnos && (
            <div aria-live="polite" className="w-full max-w-sm text-left">
              {misTurnos.length === 0 ? (
                <p className="text-sm text-brand-400">
                  No encontramos turnos futuros para tu DNI.
                </p>
              ) : (
                <ul className="space-y-2">
                  {misTurnos.map((t, i) => (
                    <li
                      key={i}
                      className="rounded-lg bg-white px-4 py-2 text-sm text-brand-600"
                    >
                      <span className="font-semibold capitalize">
                        {formatearFechaLarga(t.fecha)}
                      </span>{' '}
                      · {t.hora} · {t.medico}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <Link to="/" className="btn-secondary mt-2">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-brand-700">Confirmá tu turno</h2>
      <p className="mt-1 text-sm text-brand-500">Revisá que los datos sean correctos.</p>

      <dl className="mt-6 space-y-3 rounded-xl bg-white p-5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-brand-400">Profesional</dt>
          <dd className="font-semibold text-brand-700">{estado.medico}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-brand-400">Fecha</dt>
          <dd className="font-semibold capitalize text-brand-700">
            {estado.fecha && formatearFechaLarga(estado.fecha)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-brand-400">Hora</dt>
          <dd className="font-semibold text-brand-700">{estado.hora}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-brand-100 pt-3">
          <dt className="text-brand-400">Paciente</dt>
          <dd className="font-semibold text-brand-700">
            {estado.tipoPaciente === 'habitual'
              ? `Paciente habitual · DNI ${estado.datos.dni}`
              : `${estado.datos.nombre} ${estado.datos.apellido}`}
          </dd>
        </div>
        {estado.tipoPaciente === 'nuevo' && (
          <div className="flex justify-between gap-4">
            <dt className="text-brand-400">DNI</dt>
            <dd className="font-semibold text-brand-700">{estado.datos.dni}</dd>
          </div>
        )}
        {estado.tipoPaciente === 'nuevo' && (
          <div className="flex justify-between gap-4">
            <dt className="text-brand-400">Obra social</dt>
            <dd className="font-semibold text-brand-700">
              {estado.datos.obraSocial} · {estado.datos.numeroObraSocial}
            </dd>
          </div>
        )}
      </dl>

      {error && (
        <div role="alert" className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
          {fallbackWa && (
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 font-semibold text-whatsapp"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Coordinar por WhatsApp
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default PasoConfirmacion;
