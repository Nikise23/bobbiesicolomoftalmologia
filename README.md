# Consultorio Oftalmológico — Sitio institucional

Sitio web institucional profesional para un consultorio oftalmológico, con
información de profesionales, estudios, cirugías, contacto y un wizard de reserva
de turnos que consume la **API pública de colom-bobbiesi**.

Construido con **React 18 + TypeScript + Vite 5**, **Tailwind CSS 3**,
**react-router-dom v6** y **axios**.

---

## Desarrollo

```bash
npm install
cp .env.example .env.local   # y completá los valores (en Windows: copy)
npm run dev                  # http://localhost:5173
```

Build de producción:

```bash
npm run build     # tsc -b + vite build (sin errores ni warnings de TS)
npm run preview   # sirve dist/ localmente
```

---

## Variables de entorno

Todas son opcionales: si faltan, `src/config/site.ts` usa valores por defecto.
Copiá `.env.example` a `.env.local` para desarrollo.

| Variable | Ejemplo | Uso |
| --- | --- | --- |
| `VITE_SITE_URL` | `https://www.ejemplo.com.ar` | SEO, canonical, sitemap |
| `VITE_API_URL` | `https://colom-bobbiesi.onrender.com` | Backend (SIN `/api/public/v1`) |
| `VITE_PUBLIC_API_KEY` | *(solo dev local)* | Header `X-API-Key` en modo directo |
| `VITE_USE_API_PROXY` | `false` / `true` | En prod: `true` + proxy serverless |
| `VITE_SISTEMA_URL` | `https://colom-bobbiesi.onrender.com/` | Link "Acceso personal" |
| `VITE_TURNOS_ONLINE` | `false` | Activa el wizard cuando CORS esté listo |
| `VITE_WHATSAPP` | `5493511234567` | Número SIN `+` |
| `VITE_WHATSAPP_MSG` | `Hola, quiero...` | Mensaje precargado |
| `VITE_CONSULTORIO_DIRECCION` | `Calle 123, Ciudad` | Contacto / schema.org |
| `VITE_CONSULTORIO_TELEFONO` | `+54 351 000 0000` | Contacto |
| `VITE_MAPS_EMBED_URL` | `https://www.google.com/maps/embed?...` | iframe del mapa |

> ⚠️ **Nunca commitees `.env.local`.** Contiene `VITE_PUBLIC_API_KEY`.

---

## Dónde editar cada contenido

| Qué | Archivo |
| --- | --- |
| Nombre, dirección, teléfono, WhatsApp, SEO, URLs, horarios | `src/config/site.ts` |
| Texto de "Nosotros" | `src/data/nosotros.ts` |
| Estudios / servicios | `src/data/especialidades.ts` |
| Cirugías | `src/data/cirugias.ts` |
| Fotos, reseñas y especialidad de profesionales | `src/data/profesionales.json` |

Los valores marcados como `[PLACEHOLDER]` en `site.ts` son de ejemplo:
**reemplazalos por los datos reales del consultorio.**

### Profesionales (merge API + local)

La sección Profesionales y el paso 1 del wizard **mergean**:

- La lista de médicos activos de la API pública (`GET /medicos`, devuelve nombres).
- Los overrides locales de `profesionales.json`, matcheados por **`medicoNombre`
  (nombre exacto como aparece en el backend)**.

Campos de cada override: `medicoNombre`, `especialidad`, `resena`, `foto`,
`orden`, `visible` (poné `visible: false` para ocultar). Si la API falla, se cae
al JSON local completo.

---

## Imágenes esperadas (en `public/`)

Reemplazá los placeholders por imágenes reales (idealmente `.webp` donde se pueda).
Si un archivo falta, se muestra un placeholder SVG automáticamente.

| Archivo | Uso | Proporción sugerida |
| --- | --- | --- |
| `logo.png` | Logo (header/footer) | cuadrado |
| `favicon.svg` / `favicon.png` | Favicon | — |
| `og-image.jpg` | Open Graph / redes | 1200×630 |
| `hero-desktop.jpg` | Fondo del hero (desktop) | panorámica 16:9 |
| `hero-mobile.jpg` | Fondo del hero (mobile) | vertical |
| `nosotros.jpg` | Imagen sección Nosotros | 4:3 |
| `fachada.jpg` | Fachada del consultorio (Contacto) | 3:2 |
| `estudios/*.jpg` | Cards de estudios (ver `especialidades.ts`) | 4:3 |
| `cirugias/*.jpg` | Cards de cirugías (ver `cirugias.ts`) | 4:3 |
| `profesionales/*.jpg` | Fotos de profesionales (ver `profesionales.json`) | 4:5 |

---

## Conectar con colom-bobbiesi (API pública de turnos)

Base del contrato: `{VITE_API_URL}/api/public/v1`

| Método | Endpoint | Descripción |
| --- | --- | --- |
| `GET` | `/medicos` | Lista de médicos activos → `{ "medicos": [...] }` |
| `GET` | `/disponibilidad?medico={n}&fecha=YYYY-MM-DD` | `{ ..., "horarios_disponibles": [...] }` |
| `POST` | `/turnos` | Reservar turno |
| `GET` | `/turnos?dni={dni}&futuros=1` | Turnos futuros del paciente |
| `DELETE` | `/turnos` | Cancelar → body `{ dni, fecha, hora }` |

Todos los requests envían `X-API-Key` y `Content-Type: application/json`.
Reglas: máximo `PUBLIC_API_MAX_DIAS` (60) días a futuro, atención de lunes a
sábado (domingo cerrado). Si el DNI ya existe, alcanza con `medico/fecha/hora/dni`;
si no, el backend registra al paciente con los demás campos.

### Seguridad de la API key

- **Producción (recomendado): proxy same-origin.** Poné `VITE_USE_API_PROXY=true`.
  El frontend pega a `/api/turnos/*` del propio hosting y un proxy
  (Cloudflare Worker, Vercel/Netlify serverless o mini backend) inyecta
  `X-API-Key` del lado del servidor. Así la clave **no** queda en el bundle.
  El proxy debe reenviar a `{VITE_API_URL}/api/public/v1/*` agregando el header.
- **Desarrollo local: llamada directa.** `VITE_USE_API_PROXY=false` +
  `VITE_PUBLIC_API_KEY` en `.env.local`.
- **CORS:** el backend solo responde a orígenes en `PUBLIC_API_CORS_ORIGIN`.

### Fase 2 — Rate limiting / CAPTCHA

El paso 4 del wizard (`src/components/turnos/PasoDatos.tsx`) tiene un hook
comentado para montar **Cloudflare Turnstile** y pasar el token al `POST /turnos`
cuando el backend lo soporte.

### Configuración en Render (backend), al publicar el sitio

| Variable | Valor |
| --- | --- |
| `PUBLIC_API_CORS_ORIGIN` | `https://www.ejemplo.com.ar` (y `http://localhost:5173` para dev) |
| `PUBLIC_API_KEY` | clave segura de producción (distinta a la de dev) |
| `PUBLIC_API_MAX_DIAS` | `60` (o el máximo deseado) |

Mientras no exista dominio de producción configurado en `PUBLIC_API_CORS_ORIGIN`:
dejá `VITE_TURNOS_ONLINE=false` (el sitio usa WhatsApp para turnos).

---

## Manejo de errores de la API

`src/services/publicApi.ts` centraliza los mensajes en español (`parseApiError`):

| Código | Mensaje |
| --- | --- |
| 400 | Revisá los datos ingresados… |
| 401 | Error de configuración del servicio de turnos |
| 403 | Origen no autorizado (revisar CORS en backend) |
| 409 | Ese horario acaba de ocuparse, elegí otro |
| 503 | Turnos online temporalmente no disponibles |

Timeout de 10s y 1 reintento automático solo en requests `GET`.

---

## Estructura

```
src/
├── config/site.ts          # info del consultorio (con overrides VITE_*)
├── data/                   # contenido editable
├── services/publicApi.ts   # cliente axios de la API pública
├── hooks/                  # useProfesionales (merge API + local)
├── utils/                  # fecha, validaciones, imagen
├── components/             # Header, Footer, Layout, ScrollReveal, etc.
│   ├── home/               # Hero, Nosotros, Profesionales, Especialidades
│   └── turnos/             # wizard completo (5 pasos)
└── pages/                  # Home, Turnos, Cirugia, Contacto
```
