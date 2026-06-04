import { type ReactNode } from "react";
import { Col } from "@/components/layout/container";

type Width = "prose" | "narrow" | "full";

const widthClass: Record<Width, string> = {
  prose: "max-w-3xl",
  narrow: "max-w-2xl",
  full: "max-w-none",
};

/**
 * Centers content on the 12-column grid with a consistent max width.
 * Use centered for headings/CTAs; default keeps body copy left-aligned for readability.
 */
export function ContentColumn({
  children,
  width = "prose",
  centered = false,
  className = "",
}: {
  children: ReactNode;
  width?: Width;
  centered?: boolean;
  className?: string;
}) {
  return (
    <Col span={12} className={className}>
      <div
        className={`mx-auto w-full ${widthClass[width]} ${centered ? "text-center" : "text-left"}`}
      >
        {children}
      </div>
    </Col>
  );
}
