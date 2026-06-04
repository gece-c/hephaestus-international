"""Copy PDF-extracted images to semantic public/images paths."""
from __future__ import annotations

import json
import os
import shutil

ROOT = os.path.dirname(os.path.dirname(__file__))
SRC = os.path.join(ROOT, "public", "images", "pdf-extracted")
DST = os.path.join(ROOT, "public", "images")

# Main photo per slide (skip duplicate small logo embeds on slides 1 and 14)
MAPPING = {
    "slide-01-img-03.jpeg": ("hero-background.jpeg", "Slide 1 — hero background"),
    "slide-03-img-01.jpeg": ("positioning.jpeg", "Slide 3 — brand positioning"),
    "slide-05-img-01.jpeg": ("roots-transition.jpeg", "Slide 5 — everything starts somewhere"),
    "slide-06-img-01.jpeg": ("mapping-legacy.jpeg", "Slide 6 — mapping the legacy"),
    "slide-07-img-01.jpeg": ("lemnos.jpeg", "Slide 7 — where legacy becomes innovation"),
    "slide-08-img-01.jpeg": ("name-bridge.jpeg", "Slide 8 — before a name exists (bridge)"),
    "slide-09-img-01.jpeg": ("name-origins.jpeg", "Slide 9 — origins of the name"),
    "slide-10-img-01.jpeg": ("engine-bridge.jpeg", "Slide 10 — place and force (bridge)"),
    "slide-11-img-01.jpeg": ("learning-engine.jpeg", "Slide 11 — the learning engine"),
    "slide-12-img-01.jpeg": ("ecosystem-bridge.jpeg", "Slide 12 — intelligence takes form (bridge)"),
    "slide-14-img-03.jpeg": ("closing.jpeg", "Slide 14 — join us CTA background"),
}

# Slides with no embedded raster photos (text/layout only in PDF)
SLIDES_WITHOUT_PHOTOS = [2, 4, 13]


def main() -> None:
    os.makedirs(DST, exist_ok=True)
    manifest = {"slidesWithoutEmbeddedPhotos": SLIDES_WITHOUT_PHOTOS, "assets": []}

    for src_name, (dst_name, description) in MAPPING.items():
        src_path = os.path.join(SRC, src_name)
        dst_path = os.path.join(DST, dst_name)
        if not os.path.isfile(src_path):
            raise FileNotFoundError(src_path)
        shutil.copy2(src_path, dst_path)
        manifest["assets"].append(
            {
                "file": f"/images/{dst_name}",
                "source": f"pdf-extracted/{src_name}",
                "description": description,
            }
        )

    manifest_path = os.path.join(DST, "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
        f.write("\n")

    print(f"Wrote {len(MAPPING)} images to {DST}")
    print(f"Manifest: {manifest_path}")


if __name__ == "__main__":
    main()
