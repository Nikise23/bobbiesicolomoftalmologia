import type { SyntheticEvent } from 'react';

/** Placeholder SVG inline (data URI) para imágenes que fallan al cargar. */
export const PLACEHOLDER_SVG =
  'data:image/svg+xml;charset=utf-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#f3ebdd"/>
      <g fill="none" stroke="#c1873c" stroke-width="8" opacity="0.55">
        <circle cx="400" cy="300" r="120"/>
        <circle cx="400" cy="300" r="45"/>
      </g>
      <text x="400" y="470" font-family="sans-serif" font-size="28" fill="#9a784f" text-anchor="middle">Imagen no disponible</text>
    </svg>`
  );

/** Handler onError: reemplaza la imagen rota por el placeholder una sola vez. */
export function onImageError(e: SyntheticEvent<HTMLImageElement>): void {
  const img = e.currentTarget;
  if (img.dataset.fallbackApplied) return;
  img.dataset.fallbackApplied = 'true';
  img.src = PLACEHOLDER_SVG;
}
