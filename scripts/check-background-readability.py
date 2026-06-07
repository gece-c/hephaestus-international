"""Sample effective contrast for white text over home-page background images."""
from __future__ import annotations

import sys
from dataclasses import dataclass
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
IMAGES_DIR = ROOT / "public" / "images"

# sRGB -> relative luminance
def _channel(value: float) -> float:
    value /= 255.0
    return value / 12.92 if value <= 0.03928 else ((value + 0.055) / 1.055) ** 2.4


def relative_luminance(rgb: tuple[int, int, int]) -> float:
    r, g, b = (_channel(c) for c in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast_ratio(fg: tuple[int, int, int], bg: tuple[int, int, int]) -> float:
    l1 = relative_luminance(fg)
    l2 = relative_luminance(bg)
    lighter = max(l1, l2)
    darker = min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)


def blend(
    base: tuple[int, int, int],
    overlay: tuple[int, int, int],
    alpha: float,
) -> tuple[int, int, int]:
    return tuple(
        int(round(base[i] * (1 - alpha) + overlay[i] * alpha)) for i in range(3)
    )


def sample_region(
    img: Image.Image,
    x_start: float,
    x_end: float,
    y_start: float,
    y_end: float,
) -> tuple[int, int, int]:
    width, height = img.size
    left = int(width * x_start)
    right = max(left + 1, int(width * x_end))
    top = int(height * y_start)
    bottom = max(top + 1, int(height * y_end))
    crop = img.crop((left, top, right, bottom)).convert("RGB")
    pixels = list(crop.get_flattened_data())
    r = sum(p[0] for p in pixels) // len(pixels)
    g = sum(p[1] for p in pixels) // len(pixels)
    b = sum(p[2] for p in pixels) // len(pixels)
    return (r, g, b)


def vertical_black_gradient(y_ratio: float, top: float, mid: float, bottom: float) -> float:
    if y_ratio <= 0.5:
        t = y_ratio / 0.5
        return top + (mid - top) * t
    t = (y_ratio - 0.5) / 0.5
    return mid + (bottom - mid) * t


def bottom_black_gradient(y_ratio: float, start_y: float, top_alpha: float, bottom_alpha: float) -> float:
    if y_ratio < start_y:
        return 0.0
    t = (y_ratio - start_y) / (1.0 - start_y)
    return top_alpha + (bottom_alpha - top_alpha) * t


@dataclass
class RegionCheck:
    section: str
    region: str
    text_size: str
    min_ratio: float
    worst_ratio: float
    pass_wcag: bool


@dataclass
class SectionConfig:
    name: str
    image: str
    checks: list[tuple[str, float, float, float, float, str, callable]]


WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
BACKGROUND = (250, 250, 250)


def check_hero(img: Image.Image, region: str, xs: float, xe: float, ys: float, ye: float, text_size: str) -> RegionCheck:
    rgb = sample_region(img, xs, xe, ys, ye)
    y_mid = (ys + ye) / 2
    alpha = vertical_black_gradient(y_mid, 0.25, 0.10, 0.55)
    effective = blend(rgb, BLACK, alpha)
    ratio = contrast_ratio(WHITE, effective)
    min_required = 3.0 if text_size == "large" else 4.5
    return RegionCheck("hero", region, text_size, min_required, ratio, ratio >= min_required)


def check_bottom_gradient(
    img: Image.Image,
    section: str,
    region: str,
    xs: float,
    xe: float,
    ys: float,
    ye: float,
    text_size: str,
    *,
    heavy: bool = False,
) -> RegionCheck:
    rgb = sample_region(img, xs, xe, ys, ye)
    start_y = 0.30 if heavy else 0.50
    top_alpha = 0.60 if heavy else 0.50
    bottom_alpha = 0.90 if heavy else 0.85
    y_mid = (ys + ye) / 2
    alpha = bottom_black_gradient(y_mid, start_y, top_alpha, bottom_alpha)
    effective = blend(rgb, BLACK, alpha)
    ratio = contrast_ratio(WHITE, effective)
    min_required = 3.0 if text_size == "large" else 4.5
    return RegionCheck(section, region, text_size, min_required, ratio, ratio >= min_required)


def check_cover_overlay(
    img: Image.Image,
    section: str,
    region: str,
    xs: float,
    xe: float,
    ys: float,
    ye: float,
    text_size: str,
    *,
    dark_mode: bool = False,
) -> RegionCheck:
    rgb = sample_region(img, xs, xe, ys, ye)
    alpha = 0.45 if dark_mode else 0.35
    overlay = BLACK if dark_mode else BACKGROUND
    effective = blend(rgb, overlay, alpha)
    # Glass cards add another light surface; sample assumes card text on frosted white.
    card = blend(effective, (255, 255, 255), 0.82)
    fg = (15, 23, 42) if not dark_mode else WHITE
    ratio = contrast_ratio(fg, card)
    min_required = 3.0 if text_size == "large" else 4.5
    return RegionCheck(section, region, text_size, min_required, ratio, ratio >= min_required)


def check_name_origins(img: Image.Image, region: str, xs: float, xe: float, ys: float, ye: float, text_size: str) -> RegionCheck:
    rgb = sample_region(img, xs, xe, ys, ye)
    y_mid = (ys + ye) / 2
    alpha = 0.28
    alpha += 0.38 * max(0.0, 1.0 - abs((xs + xe) / 2 - 0.32) / 0.35)
    alpha = min(alpha + vertical_black_gradient(y_mid, 0.18, 0.08, 0.22), 0.75)
    effective = blend(rgb, BLACK, alpha)
    ratio = contrast_ratio(WHITE, effective)
    min_required = 3.0 if text_size == "large" else 4.5
    return RegionCheck("name-origins", region, text_size, min_required, ratio, ratio >= min_required)


def check_learning_engine(img: Image.Image, region: str, xs: float, xe: float, ys: float, ye: float, text_size: str) -> RegionCheck:
    rgb = sample_region(img, xs, xe, ys, ye)
    y_mid = (ys + ye) / 2
    alpha = 0.18
    alpha += bottom_black_gradient(y_mid, 0.30, 0.35, 0.60)
    alpha = min(alpha + 0.22 * (1.0 - xs), 0.85)
    effective = blend(rgb, BLACK, alpha)
    ratio = contrast_ratio(WHITE, effective)
    min_required = 3.0 if text_size == "large" else 4.5
    return RegionCheck("learning-engine", region, text_size, min_required, ratio, ratio >= min_required)


def check_closing(img: Image.Image, region: str, xs: float, xe: float, ys: float, ye: float, text_size: str) -> RegionCheck:
    rgb = sample_region(img, xs, xe, ys, ye)
    y_mid = (ys + ye) / 2
    x_mid = (xs + xe) / 2
    alpha = 0.22
    alpha += 0.50 * max(0.0, 1.0 - abs(x_mid - 0.5) / 0.35)
    alpha += bottom_black_gradient(y_mid, 0.45, 0.35, 0.65)
    effective = blend(rgb, BLACK, min(alpha, 0.88))
    ratio = contrast_ratio(WHITE, effective)
    min_required = 3.0 if text_size == "large" else 4.5
    return RegionCheck("closing", region, text_size, min_required, ratio, ratio >= min_required)


def check_mapping_legacy(img: Image.Image, region: str, xs: float, xe: float, ys: float, ye: float, text_size: str) -> RegionCheck:
    rgb = sample_region(img, xs, xe, ys, ye)
    y_mid = (ys + ye) / 2
    alpha = 0.55 + (0.30 - 0.55) * (y_mid / 0.35) if y_mid <= 0.35 else 0.0
    alpha = max(alpha, 0.0)
    effective = blend(rgb, BLACK, alpha)
    ratio = contrast_ratio(WHITE, effective)
    min_required = 3.0 if text_size == "large" else 4.5
    return RegionCheck("mapping-legacy", region, text_size, min_required, ratio, ratio >= min_required)


SECTIONS: list[tuple[str, str, list]] = [
    (
        "hero",
        "hero-background.webp",
        [
            ("center headline", 0.25, 0.75, 0.30, 0.55, "large", check_hero),
            ("center taglines", 0.20, 0.80, 0.50, 0.72, "normal", check_hero),
        ],
    ),
    (
        "did-you-know",
        "did-you-know-lemnos.webp",
        [
            ("heading card", 0.30, 0.70, 0.08, 0.18, "large", lambda img, r, xs, xe, ys, ye, ts: check_cover_overlay(img, "did-you-know", r, xs, xe, ys, ye, ts)),
            ("fact cards", 0.05, 0.95, 0.22, 0.78, "normal", lambda img, r, xs, xe, ys, ye, ts: check_cover_overlay(img, "did-you-know", r, xs, xe, ys, ye, ts)),
        ],
    ),
    (
        "positioning",
        "positioning.webp",
        [
            ("title", 0.05, 0.95, 0.55, 0.72, "large", lambda img, r, xs, xe, ys, ye, ts: check_bottom_gradient(img, "positioning", r, xs, xe, ys, ye, ts, heavy=True)),
            ("body copy", 0.05, 0.95, 0.68, 0.92, "normal", lambda img, r, xs, xe, ys, ye, ts: check_bottom_gradient(img, "positioning", r, xs, xe, ys, ye, ts, heavy=True)),
        ],
    ),
    (
        "pillars",
        "pillars-background.webp",
        [
            ("heading card", 0.30, 0.70, 0.06, 0.16, "large", lambda img, r, xs, xe, ys, ye, ts: check_cover_overlay(img, "pillars", r, xs, xe, ys, ye, ts)),
            ("pillar cards", 0.05, 0.95, 0.24, 0.88, "normal", lambda img, r, xs, xe, ys, ye, ts: check_cover_overlay(img, "pillars", r, xs, xe, ys, ye, ts)),
        ],
    ),
    (
        "roots-transition",
        "roots-transition.webp",
        [
            ("bottom-left copy", 0.05, 0.55, 0.58, 0.88, "large", lambda img, r, xs, xe, ys, ye, ts: check_bottom_gradient(img, "roots-transition", r, xs, xe, ys, ye, ts)),
        ],
    ),
    (
        "mapping-legacy",
        "mapping-legacy.webp",
        [
            ("upper title", 0.20, 0.80, 0.04, 0.14, "large", check_mapping_legacy),
        ],
    ),
    (
        "lemnos",
        "lemnos.webp",
        [
            ("title", 0.05, 0.75, 0.58, 0.72, "large", lambda img, r, xs, xe, ys, ye, ts: check_bottom_gradient(img, "lemnos", r, xs, xe, ys, ye, ts, heavy=True)),
            ("paragraphs", 0.05, 0.75, 0.70, 0.92, "normal", lambda img, r, xs, xe, ys, ye, ts: check_bottom_gradient(img, "lemnos", r, xs, xe, ys, ye, ts, heavy=True)),
        ],
    ),
    (
        "name-bridge",
        "name-bridge.webp",
        [
            ("bottom-left copy", 0.05, 0.55, 0.58, 0.88, "large", lambda img, r, xs, xe, ys, ye, ts: check_bottom_gradient(img, "name-bridge", r, xs, xe, ys, ye, ts)),
        ],
    ),
    (
        "name-origins",
        "name-origins.webp",
        [
            ("title", 0.10, 0.90, 0.04, 0.10, "large", check_name_origins),
            ("zigzag blocks", 0.05, 0.55, 0.14, 0.86, "normal", check_name_origins),
            ("footer", 0.10, 0.90, 0.90, 0.97, "large", check_name_origins),
        ],
    ),
    (
        "engine-bridge",
        "engine-bridge.webp",
        [
            ("bottom-left copy", 0.05, 0.55, 0.58, 0.88, "large", lambda img, r, xs, xe, ys, ye, ts: check_bottom_gradient(img, "engine-bridge", r, xs, xe, ys, ye, ts)),
        ],
    ),
    (
        "learning-engine",
        "learning-engine.webp",
        [
            ("title", 0.05, 0.70, 0.62, 0.74, "large", check_learning_engine),
            ("body copy", 0.05, 0.70, 0.72, 0.92, "normal", check_learning_engine),
        ],
    ),
    (
        "ecosystem-bridge",
        "ecosystem-bridge.webp",
        [
            ("bottom-left copy", 0.05, 0.55, 0.58, 0.88, "large", lambda img, r, xs, xe, ys, ye, ts: check_bottom_gradient(img, "ecosystem-bridge", r, xs, xe, ys, ye, ts)),
        ],
    ),
    (
        "closing",
        "closing.webp",
        [
            ("lead copy", 0.15, 0.85, 0.62, 0.72, "normal", check_closing),
            ("headline", 0.15, 0.85, 0.78, 0.88, "large", check_closing),
            ("cta area", 0.15, 0.85, 0.88, 0.96, "normal", check_closing),
        ],
    ),
]


def main() -> int:
    results: list[RegionCheck] = []
    missing: list[str] = []

    for section, filename, checks in SECTIONS:
        path = IMAGES_DIR / filename
        if not path.is_file():
            missing.append(filename)
            continue
        with Image.open(path) as img:
            rgb_img = img.convert("RGB")
            for region, xs, xe, ys, ye, text_size, checker in checks:
                results.append(checker(rgb_img, region, xs, xe, ys, ye, text_size))

    if missing:
        print("Missing images:", ", ".join(missing))
        return 1

    failed = [r for r in results if not r.pass_wcag]
    print(f"Checked {len(results)} text regions across {len(SECTIONS)} sections.\n")
    for result in results:
        status = "PASS" if result.pass_wcag else "FAIL"
        print(
            f"[{status}] {result.section}/{result.region} "
            f"({result.text_size} text, min {result.min_ratio:.1f}:1): "
            f"{result.worst_ratio:.2f}:1"
        )

    print()
    if failed:
        print(f"{len(failed)} region(s) below WCAG target:")
        for result in failed:
            print(f"  - {result.section}/{result.region}: {result.worst_ratio:.2f}:1")
        return 1

    print("All sampled regions meet WCAG contrast targets with current overlays.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
