/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_API_URL?: string;
  readonly VITE_PUBLIC_API_KEY?: string;
  readonly VITE_USE_API_PROXY?: string;
  readonly VITE_SISTEMA_URL?: string;
  readonly VITE_TURNOS_ONLINE?: string;
  readonly VITE_WHATSAPP?: string;
  readonly VITE_WHATSAPP_MSG?: string;
  readonly VITE_CONSULTORIO_DIRECCION?: string;
  readonly VITE_CONSULTORIO_TELEFONO?: string;
  readonly VITE_MAPS_EMBED_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
