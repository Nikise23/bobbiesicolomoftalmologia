import { useState } from 'react';
import type { DatosPaciente, TipoPaciente } from './tipos';
import {
  formatearFechaNacimientoInput,
  validarDni,
  validarCelular,
  validarFechaNacimiento,
  validarEmail,
  validarNombre,
} from '@/utils/validaciones';

interface PasoDatosProps {
  tipoPaciente: TipoPaciente;
  datos: DatosPaciente;
  onChange: (datos: DatosPaciente) => void;
  registrarValidacion: (fn: () => boolean) => void;
}

type Errores = Partial<Record<keyof DatosPaciente, string>>;

function validar(datos: DatosPaciente): Errores {
  const e: Errores = {};
  if (!validarNombre(datos.nombre)) e.nombre = 'Ingresá tu nombre.';
  if (!validarNombre(datos.apellido)) e.apellido = 'Ingresá tu apellido.';
  if (!validarDni(datos.dni)) e.dni = 'El DNI debe tener 7 u 8 dígitos.';
  if (!validarFechaNacimiento(datos.fechaNacimiento))
    e.fechaNacimiento = 'Usá el formato dd/mm/aaaa.';
  if (!validarCelular(datos.celular)) e.celular = 'Ingresá un celular válido.';
  if (!datos.obraSocial.trim()) e.obraSocial = 'Ingresá tu obra social (o "Particular").';
  if (!datos.numeroObraSocial.trim())
    e.numeroObraSocial = 'Ingresá tu número de afiliado.';
  if (datos.email.trim() && !validarEmail(datos.email))
    e.email = 'El email no es válido.';
  if (!datos.acepta) e.acepta = 'Necesitamos tu conformidad para continuar.';
  return e;
}

/** Paso datos completos — solo pacientes nuevos. */
export function PasoDatos({ datos, onChange, registrarValidacion }: PasoDatosProps) {
  const [errores, setErrores] = useState<Errores>({});

  registrarValidacion(() => {
    const e = validar(datos);
    setErrores(e);
    return Object.keys(e).length === 0;
  });

  const set = (campo: keyof DatosPaciente, valor: string | boolean) => {
    onChange({ ...datos, [campo]: valor });
  };

  const campo = (
    id: keyof DatosPaciente,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> = {},
    formatear?: (valor: string) => string
  ) => (
    <div>
      <label htmlFor={id} className="label-field">
        {label}
      </label>
      <input
        id={id}
        className="input-field"
        value={datos[id] as string}
        onChange={(e) => {
          const valor = e.target.value;
          set(id, formatear ? formatear(valor) : valor);
        }}
        aria-invalid={!!errores[id]}
        aria-describedby={errores[id] ? `${id}-error` : undefined}
        {...props}
      />
      {errores[id] && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-red-600">
          {errores[id]}
        </p>
      )}
    </div>
  );

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-brand-700">Tus datos</h2>
      <p className="mt-1 text-sm text-brand-500">
        Como sos paciente nuevo, completá tus datos para darte de alta en el consultorio.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {campo('nombre', 'Nombre', { autoComplete: 'given-name', placeholder: 'Juan' })}
        {campo('apellido', 'Apellido', {
          autoComplete: 'family-name',
          placeholder: 'Pérez',
        })}
        {campo('dni', 'DNI', {
          inputMode: 'numeric',
          placeholder: '12345678',
          maxLength: 8,
        })}
        {campo(
          'fechaNacimiento',
          'Fecha de nacimiento',
          {
            placeholder: 'dd/mm/aaaa',
            inputMode: 'numeric',
            maxLength: 10,
          },
          formatearFechaNacimientoInput
        )}
        {campo('celular', 'Celular', {
          inputMode: 'tel',
          autoComplete: 'tel',
          placeholder: '3511234567',
        })}
        {campo('email', 'Email (opcional, para recibir la confirmación)', {
          type: 'email',
          autoComplete: 'email',
          placeholder: 'juan@correo.com',
        })}
        {campo('obraSocial', 'Obra social', { placeholder: 'OSDE / Particular' })}
        {campo('numeroObraSocial', 'N° de afiliado', { placeholder: '123456' })}
      </div>

      <div className="mt-5">
        <label className="flex items-start gap-3 text-sm text-brand-600">
          <input
            type="checkbox"
            checked={datos.acepta}
            onChange={(e) => set('acepta', e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-brand-300 text-accent-500 focus:ring-accent-400"
            aria-invalid={!!errores.acepta}
            aria-describedby={errores.acepta ? 'acepta-error' : undefined}
          />
          <span>
            Acepto que mis datos sean utilizados para gestionar mi turno y
            contactarme ante cualquier novedad.
          </span>
        </label>
        {errores.acepta && (
          <p id="acepta-error" role="alert" className="mt-1 text-xs text-red-600">
            {errores.acepta}
          </p>
        )}
      </div>
    </div>
  );
}

export default PasoDatos;
