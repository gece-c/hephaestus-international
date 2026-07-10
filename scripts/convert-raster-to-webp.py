"""Convert public/images raster assets (JPEG/PNG) to WebP."""
from __future__ import annotations

import os
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "public" / "images"
QUALITY = 85


def convert_file(path: Path) -> Path:
    dst = path.with_suffix(".webp")
    with Image.open(path) as img:
        if img.mode in ("RGBA", "LA"):
            img.save(dst, format="WEBP", quality=QUALITY, method=6, lossless=False)
        else:
            rgb = img.convert("RGB")
            rgb.save(dst, format="WEBP", quality=QUALITY, method=6)
    return dst


def main() -> None:
    converted: list[tuple[Path, Path, int, int]] = []

    for path in sorted(IMAGES.iterdir()):
        if path.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
            continue
        before = path.stat().st_size
        dst = convert_file(path)
        after = dst.stat().st_size
        converted.append((path, dst, before, after))
        print(f"{path.name} -> {dst.name} ({before:,} -> {after:,} bytes)")

    if not converted:
        print("No JPEG/PNG files found in public/images.")
        return

    print(f"\nConverted {len(converted)} file(s). Remove originals after references are updated.")


if __name__ == "__main__":
    main()
