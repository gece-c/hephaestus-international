import { brandLogoPath } from "@/lib/brand-assets";
import { withBasePath } from "@/lib/site-url";

const logoMask = `url("${withBasePath(brandLogoPath)}")`;

/** Hephaestus hand mark — rendered from public/logo.svg (header + favicon share one file). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={`inline-block shrink-0 bg-current ${className ?? ""}`}
      style={{
        maskImage: logoMask,
        WebkitMaskImage: logoMask,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
      aria-hidden
    />
  );
}
