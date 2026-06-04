import { Col, Container, Section } from "@/components/layout/container";
import { SectionBackdrop } from "@/components/ui/section-image";
import type { SiteImageAsset } from "@/lib/site-images";

export function TransitionBlock({
  lines,
  className = "",
  image,
  imageAlt,
}: {
  lines: readonly string[];
  className?: string;
  image?: SiteImageAsset;
  imageAlt?: string;
}) {
  const body = (
    <Container>
      <Col span={12} className="md:col-span-10 lg:col-span-8">
        <div className="max-w-2xl text-left">
          <div className="space-y-3 text-lg font-medium text-pretty text-white md:text-xl lg:text-2xl [&_p]:[text-shadow:0_1px_2px_rgb(0_0_0_/_0.95),0_2px_8px_rgb(0_0_0_/_0.88),0_4px_20px_rgb(0_0_0_/_0.6)]">
            {lines.map((line) => (
              <p key={line} className="text-pretty">
                {line}
              </p>
            ))}
          </div>
        </div>
      </Col>
    </Container>
  );

  if (!image) {
    return <Section className={className}>{body}</Section>;
  }

  return (
    <Section padding="none" className={className}>
      <SectionBackdrop
        image={image}
        alt={imageAlt ?? ""}
        contentClassName="py-20 md:py-28 lg:py-32"
      >
        {body}
      </SectionBackdrop>
    </Section>
  );
}
