import { type ReactNode } from "react";
import { cardRadiusClass, glassSurfaceWithChip } from "@/lib/ui-styles";

export function Card({
  children,
  className = "",
  chipSeed = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Stable seed so the same card keeps its chip pattern across renders. */
  chipSeed?: number | string;
}) {
  return (
    <div
      className={`${cardRadiusClass} ${glassSurfaceWithChip(chipSeed)} min-w-0 p-6 text-card-foreground ${className}`}
    >
      {children}
    </div>
  );
}
