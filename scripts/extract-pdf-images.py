"""Extract embedded images from Hephaestus International. Version 3.pdf."""
from __future__ import annotations

import os
import sys

import fitz

PDF_PATH = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "Hephaestus International. Version 3.pdf",
)
OUT_DIR = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "public",
    "images",
    "pdf-extracted",
)


def main() -> int:
    os.makedirs(OUT_DIR, exist_ok=True)
    doc = fitz.open(PDF_PATH)
    print(f"pages: {doc.page_count}")
    img_count = 0
    for page_num in range(doc.page_count):
        page = doc[page_num]
        for img_index, img in enumerate(page.get_images(full=True)):
            xref = img[0]
            base = doc.extract_image(xref)
            ext = base["ext"]
            img_count += 1
            name = f"slide-{page_num + 1:02d}-img-{img_index + 1:02d}.{ext}"
            path = os.path.join(OUT_DIR, name)
            with open(path, "wb") as f:
                f.write(base["image"])
            w, h = base["width"], base["height"]
            size = len(base["image"])
            print(f"{name}: {w}x{h} {size} bytes")
    print(f"total embedded images: {img_count}")
    doc.close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
