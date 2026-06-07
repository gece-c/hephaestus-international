"""Convert site background JPEGs in public/images to WebP."""
from __future__ import annotations

import os
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
IMAGES_DIR = ROOT / "public" / "images"
QUALITY = 85


def convert_jpeg_to_webp(jpeg_path: Path) -> Path:
    webp_path = jpeg_path.with_suffix(".webp")
    with Image.open(jpeg_path) as img:
        img.save(webp_path, format="WEBP", quality=QUALITY, method=6)
    return webp_path


def main() -> None:
    converted: list[tuple[str, int, int]] = []

    for jpeg_path in sorted(IMAGES_DIR.glob("*.jpeg")):
        webp_path = convert_jpeg_to_webp(jpeg_path)
        jpeg_size = jpeg_path.stat().st_size
        webp_size = webp_path.stat().st_size
        converted.append((webp_path.name, jpeg_size, webp_size))
        jpeg_path.unlink()

    if not converted:
        print("No JPEG files found in public/images.")
        return

    print(f"Converted {len(converted)} images to WebP (quality={QUALITY}):")
    for name, before, after in converted:
        savings = (1 - after / before) * 100 if before else 0
        print(f"  {name}: {before:,} B -> {after:,} B ({savings:.1f}% smaller)")


if __name__ == "__main__":
    main()
