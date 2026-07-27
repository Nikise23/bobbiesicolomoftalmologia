"""Recolorea logo.webp de marrón/crema a azul de la paleta accent."""
from __future__ import annotations

import colorsys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PATHS = [
    ROOT / "src" / "assets" / "images" / "logo.webp",
    ROOT / "public" / "logo.webp",
]

# Azul principal (accent-500) y azul oscuro (accent-600)
TARGET_H = 212 / 360  # ~#1e4d8c
LIGHT_RGB = (238, 243, 249)  # accent-50


def is_near_white(r: int, g: int, b: int) -> bool:
    return r > 245 and g > 245 and b > 245


def is_cream(r: int, g: int, b: int, s: float, v: float) -> bool:
    # Rellenos claros cálidos del logo original
    return v > 0.78 and s < 0.35 and r >= g >= b * 0.9


def is_brown(r: int, g: int, b: int, s: float, v: float) -> bool:
    h, _, _ = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
    # Marrones / caramelo (≈20°–45°)
    warm = 0.03 <= h <= 0.14
    return warm and s > 0.12 and v < 0.92


def map_brown(r: int, g: int, b: int) -> tuple[int, int, int]:
    _, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
    # Anclar al azul accent-500/600, preservando contraste interno
    new_s = min(0.9, max(0.45, s * 1.15 + 0.15))
    new_v = min(0.58, max(0.18, v * 0.72 + 0.05))
    nr, ng, nb = colorsys.hsv_to_rgb(TARGET_H, new_s, new_v)
    return int(nr * 255), int(ng * 255), int(nb * 255)


def recolor(im: Image.Image) -> Image.Image:
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 8:
                continue
            if is_near_white(r, g, b):
                continue
            hh, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
            if is_cream(r, g, b, s, v):
                # Suavizar crema hacia azul muy claro, respetando alpha
                t = min(1.0, s / 0.35)
                nr = int(r * (1 - t) + LIGHT_RGB[0] * t)
                ng = int(g * (1 - t) + LIGHT_RGB[1] * t)
                nb = int(b * (1 - t) + LIGHT_RGB[2] * t)
                # Empujar un poco hacia el azul claro
                nr, ng, nb = (
                    int(0.35 * nr + 0.65 * LIGHT_RGB[0]),
                    int(0.35 * ng + 0.65 * LIGHT_RGB[1]),
                    int(0.35 * nb + 0.65 * LIGHT_RGB[2]),
                )
                px[x, y] = (nr, ng, nb, a)
            elif is_brown(r, g, b, s, v):
                nr, ng, nb = map_brown(r, g, b)
                px[x, y] = (nr, ng, nb, a)
    return im


def main() -> None:
    # Siempre partir del original marrón para poder re-aplicar el mapeo
    src = ROOT / "src" / "assets" / "images" / "logo-original-marron.webp"
    if not src.exists():
        src = PATHS[0]
    im = Image.open(src).convert("RGBA")
    out = recolor(im)
    for path in PATHS:
        path.parent.mkdir(parents=True, exist_ok=True)
        out.save(path, "WEBP", quality=92, method=6)
        print(f"saved {path}")


if __name__ == "__main__":
    main()
