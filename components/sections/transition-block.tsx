import { Col, Container, Section } from "@/components/layout/container";
import { SectionBackdrop } from "@/components/ui/section-image";
import { preventOrphans } from "@/lib/prevent-orphans";
import type { SiteImageAsset } from "@/lib/site-images";
import { type } from "@/lib/typography";

const TRANSITION_TEXT_SHADOW =
  "text-white [&_p]:[text-shadow:0_1px_2px_rgb(0_0_0_/_0.95),0_2px_8px_rgb(0_0_0_/_0.88),0_4px_20px_rgb(0_0_0_/_0.6)]";

export function TransitionBlock({
  lines,
  className = "",
  image,
  imageAlt,
  alternateHeadlineSizes = false,
}: {
  lines: readonly string[];
  className?: string;
  image?: SiteImageAsset;
  imageAlt?: string;
  /** Slide 5: alternate 30pt / 24pt lines */
  alternateHeadlineSizes?: boolean;
}) {
  const body = (
    <Container>
      <Col span={12} className="md:col-span-11 lg:col-span-10">
        <div className="w-full max-w-5xl text-left">
          <div className={`space-y-3 ${TRANSITION_TEXT_SHADOW}`}>
            {lines.map((line, index) => {
              const sizeClass = alternateHeadlineSizes
                ? index % 2 === 0
                  ? type.slideTitle
                  : type.slideHeadline
                : type.slideTitle;

              return (
                <p key={line} className={`text-balance ${sizeClass}`}>
                  {preventOrphans(line)}
                </p>
              );
            })}
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
