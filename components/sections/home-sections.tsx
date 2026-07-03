import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Col, Container, Section } from "@/components/layout/container";
import { ContentColumn } from "@/components/layout/content-column";
import { TransitionBlock } from "@/components/sections/transition-block";
import { HeroBackdrop } from "@/components/ui/hero-backdrop";
import {
  PhotoGridOverlay,
  SectionBackdrop,
  SectionCoverBackdrop,
  SectionImageSplit,
} from "@/components/ui/section-image";
import {
  Prose,
  ProseParagraph,
  SectionHeading,
} from "@/components/ui/typography";
import {
  hero,
  didYouKnow,
  positioning,
  pillars,
  roots,
  mappingLegacy,
  lemnos,
  nameBridge,
  nameOrigins,
  engineBridge,
  learningEngine,
  formBridge,
  ecosystem,
  closingCta,
} from "@/content/site-content";
import { siteImages } from "@/lib/site-images";
import { type } from "@/lib/typography";
import {
  cardRadiusClass,
  glassSurfaceClass,
  glassTextClass,
  photoCoverOverlayClass,
  photoCoverOverlayStrongClass,
  photoGradientBottomClosingClass,
  photoGradientVerticalSoftClass,
  photoBrandAccentClass,
  externalBodyLinkClass,
  photoRadialCenterClass,
  photoTextColumnScrimClass,
  photoTintClosingClass,
  photoTintStrongClass,
  photoWhiteTextClass,
  photoWhiteTextSoftClass,
} from "@/lib/ui-styles";

const glassTitlePillClass = `inline-block max-w-full ${cardRadiusClass} ${glassSurfaceClass} px-5 py-3`;

export function HeroSection() {
  return (
    <HeroBackdrop
      image={siteImages.heroBackground}
      alt="Hephaestus International presentation hero"
      priority
    >
      <div className="mx-auto w-full max-w-3xl text-center [&_h1]:[text-shadow:0_1px_2px_rgb(0_0_0_/_0.95),0_2px_10px_rgb(0_0_0_/_0.9),0_4px_28px_rgb(0_0_0_/_0.65)] [&_p]:[text-shadow:0_1px_2px_rgb(0_0_0_/_0.95),0_2px_8px_rgb(0_0_0_/_0.88),0_4px_20px_rgb(0_0_0_/_0.6)]">
        <SectionHeading as="h1" scale="title" className="text-white">
          {hero.title}
        </SectionHeading>
        <p className={`mt-4 ${type.slideSubhead} text-balance text-white`}>
          {hero.subtitle}
        </p>
        <div className="mt-8 space-y-3 text-pretty text-white/90">
          <p className={`${type.slideLead} text-balance`}>{hero.taglines[0]}</p>
          <p className={`${type.slideBody} text-balance`}>{hero.taglines[1]}</p>
        </div>
      </div>
    </HeroBackdrop>
  );
}

export function DidYouKnowSection() {
  return (
    <Section id="did-you-know" padding="none">
      <SectionCoverBackdrop
        image={siteImages.didYouKnowBackground}
        alt="Aerial view of the Lemnos coastline in Greece"
        overlayClassName={photoCoverOverlayClass}
      >
        <Container className="py-16 md:py-24 lg:py-28">
          <ContentColumn centered className="mb-8">
            <div className={glassTitlePillClass}>
              <SectionHeading as="h2" scale="title" className={glassTextClass}>
                {didYouKnow.leadIn}
              </SectionHeading>
            </div>
          </ContentColumn>
          <ContentColumn width="full">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {didYouKnow.facts.map((fact, index) => (
                <Card key={fact} chipSeed={index} className="h-full min-w-0">
                  <p className={`${type.slideBody} text-pretty ${glassTextClass}`}>
                    {fact}
                  </p>
                </Card>
              ))}
            </div>
            <Card chipSeed="did-you-know-closing" className="mt-4 text-center">
              <p className={`${type.slideLead} text-balance ${glassTextClass}`}>
                {didYouKnow.closing}
              </p>
            </Card>
          </ContentColumn>
        </Container>
      </SectionCoverBackdrop>
    </Section>
  );
}


const MOBILE_PHOTO_HEADING_SHADOW =
  "max-lg:[text-shadow:0_1px_2px_rgb(0_0_0_/_0.95),0_2px_10px_rgb(0_0_0_/_0.9),0_4px_28px_rgb(0_0_0_/_0.65)]";

export function PositioningSection() {
  return (
    <Section id="positioning" padding="none">
      <SectionImageSplit
        image={siteImages.positioning}
        alt={positioning.title}
        overlay="heavy"
      >
        <SectionHeading
          scale="title"
          className={`max-lg:text-white ${MOBILE_PHOTO_HEADING_SHADOW}`}
        >
          {positioning.title}
        </SectionHeading>
        <div className="mt-6 w-full">
          <Prose
            size="lg"
            className="max-w-none [&_p]:type-slide-subhead [&_p]:text-balance max-lg:text-white/90 max-lg:[&_p]:[text-shadow:0_1px_2px_rgb(0_0_0_/_0.95),0_2px_8px_rgb(0_0_0_/_0.88),0_4px_20px_rgb(0_0_0_/_0.6)] lg:[&_p]:[text-shadow:none]"
          >
            {positioning.paragraphs.map((paragraph) => (
              <ProseParagraph key={paragraph}>{paragraph}</ProseParagraph>
            ))}
          </Prose>
        </div>
      </SectionImageSplit>
    </Section>
  );
}

export function PillarsSection() {
  return (
    <Section id="pillars" padding="none">
      <SectionCoverBackdrop
        image={siteImages.pillarsBackground}
        alt="Rustic blacksmith workshop with tools and an anvil"
        overlayClassName={photoCoverOverlayStrongClass}
      >
        <Container className="py-16 md:py-24 lg:py-28">
          <ContentColumn centered className="mb-12">
            <div className={glassTitlePillClass}>
              <SectionHeading as="h2" scale="headline" className={glassTextClass}>
                {pillars.title}
              </SectionHeading>
            </div>
          </ContentColumn>
          <ContentColumn width="full">
            <div className="grid gap-6 md:grid-cols-3">
              {pillars.items.map((pillar) => (
                <Card key={pillar.number} chipSeed={pillar.number} className="h-full">
                  <span className={`${type.slideNumber} text-brand-primary`}>
                    {pillar.number}
                  </span>
                  <SectionHeading as="h3" scale="lead" className={`mt-4 ${glassTextClass}`}>
                    {pillar.title}
                  </SectionHeading>
                  <div className={`mt-4 ${type.slideBody} ${glassTextClass}`}>
                    {pillar.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-pretty">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </ContentColumn>
        </Container>
      </SectionCoverBackdrop>
    </Section>
  );
}

export function RootsTransition() {
  return (
    <TransitionBlock
      lines={roots.lines}
      image={siteImages.rootsTransition}
      imageAlt="Everything starts somewhere"
      alternateHeadlineSizes
    />
  );
}

export function MappingLegacySection() {
  return (
    <Section id="mapping-legacy" padding="none">
      <SectionBackdrop
        image={siteImages.mappingLegacy}
        alt={mappingLegacy.title}
        contentAlign="upper-center"
        contentClassName="pt-[4%] sm:pt-[5%] md:pt-[6%] lg:pt-[7%]"
        overlay="top"
      >
        <Container>
          <ContentColumn
            centered
            className="[&_h2]:[text-shadow:0_1px_2px_rgb(0_0_0_/_0.95),0_2px_10px_rgb(0_0_0_/_0.9),0_4px_28px_rgb(0_0_0_/_0.65)]"
          >
            <SectionHeading as="h2" className="text-white">
              {mappingLegacy.title}
            </SectionHeading>
          </ContentColumn>
        </Container>
      </SectionBackdrop>
    </Section>
  );
}

const LEMNOS_ACCENT_TERMS = [
  "For us,",
  "Hephaestus.",
  "Lemnos.",
  "Made.",
  "legacy…",
] as const;

const lemnosAccentPattern = new RegExp(
  `(${LEMNOS_ACCENT_TERMS.map((term) =>
    term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  ).join("|")})`,
  "g",
);

function LemnosParagraph({ text }: { text: string }) {
  const isLead =
    text.startsWith("Each journey") ||
    text.startsWith("Our forge") ||
    text.startsWith("Our workshop") ||
    text.startsWith("Our first lab");
  const parts = text.split(lemnosAccentPattern).filter((part) => part.length > 0);

  return (
    <ProseParagraph className={isLead ? type.slideLead : type.slideBody}>
      {parts.map((part, index) =>
        (LEMNOS_ACCENT_TERMS as readonly string[]).includes(part) ? (
          <span
            key={`${part}-${index}`}
            className="font-semibold text-brand-primary drop-shadow-sm"
          >
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </ProseParagraph>
  );
}

export function LemnosSection() {
  return (
    <Section id="lemnos" padding="none">
      <SectionBackdrop
        image={siteImages.lemnos}
        alt={lemnos.title}
        overlay="heavy"
        contentClassName="py-8 md:py-10"
      >
        <Container>
          <Col span={12} className="lg:col-span-9">
            <SectionHeading className="text-white drop-shadow-md">
              {lemnos.title}
            </SectionHeading>
            <div className="mt-4">
              <Prose className="!space-y-1.5 text-white/90 [&_p]:drop-shadow-sm">
                {lemnos.paragraphs.map((paragraph) => (
                  <LemnosParagraph key={paragraph} text={paragraph} />
                ))}
              </Prose>
            </div>
          </Col>
        </Container>
      </SectionBackdrop>
    </Section>
  );
}

export function NameBridgeTransition() {
  return (
    <TransitionBlock
      lines={nameBridge.lines}
      image={siteImages.nameBridge}
      imageAlt="Before a name exists"
    />
  );
}

const NAME_ORIGINS_TEXT = photoWhiteTextSoftClass;

const NAME_ORIGINS_LEFT_ACCENTS = [
  "Hephaestus International",
  "reclaimed",
  "spark",
  "Hephaestus",
] as const;

const NAME_ORIGINS_RIGHT_ACCENTS = [
  "learning through doing",
  "questioning what exists",
  "making",
  "craft",
  "knowledge",
  "creation",
] as const;

function nameOriginsAccentPattern(terms: readonly string[]) {
  const escaped = [...terms]
    .sort((a, b) => b.length - a.length)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return new RegExp(`(${escaped.join("|")})`, "g");
}

function NameOriginsAccentLine({
  text,
  accents,
}: {
  text: string;
  accents: readonly string[];
}) {
  const parts = text
    .split(nameOriginsAccentPattern(accents))
    .filter((part) => part.length > 0);

  return (
    <p className={`${type.slideBody} sm:type-slide-lead text-balance text-center ${NAME_ORIGINS_TEXT}`}>
      {parts.map((part, index) =>
        (accents as readonly string[]).includes(part) ? (
          <span
            key={`${part}-${index}`}
            className={photoBrandAccentClass}
          >
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </p>
  );
}

function NameOriginsContent() {
  const blocks = nameOrigins.leftBlocks.flatMap((leftLines, index) => [
    {
      lines: leftLines,
      accents: NAME_ORIGINS_LEFT_ACCENTS,
    },
    {
      lines: nameOrigins.rightBlocks[index],
      accents: NAME_ORIGINS_RIGHT_ACCENTS,
    },
  ]);

  return (
    <div
      className={`flex flex-col items-center gap-6 sm:gap-8 ${NAME_ORIGINS_TEXT}`}
    >
      {blocks.map((block, index) => (
        <div key={index} className="w-full max-w-[92%] space-y-0.5 text-center sm:max-w-[80%] sm:space-y-1">
          {block.lines.map((line) => (
            <NameOriginsAccentLine
              key={line}
              text={line}
              accents={block.accents}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function NameOriginsSection() {
  const image = siteImages.nameOrigins;

  return (
    <Section id="name-origins" padding="none">
      <PhotoGridOverlay
        image={image}
        alt={nameOrigins.title}
        alignClass="justify-between"
        contentClassName="gap-8 px-[6%] py-8 sm:gap-10 sm:px-[8%] sm:py-10"
        overlayLayers={
          <>
            <div
              className={`pointer-events-none absolute inset-0 z-[5] ${photoTintStrongClass}`}
              aria-hidden
            />
            <div
              className={`pointer-events-none absolute inset-0 z-[5] ${photoRadialCenterClass}`}
              aria-hidden
            />
            <div
              className={`pointer-events-none absolute inset-0 z-[5] ${photoGradientVerticalSoftClass}`}
              aria-hidden
            />
            <div
              className={`pointer-events-none absolute inset-0 z-[6] ${photoTextColumnScrimClass}`}
              aria-hidden
            />
          </>
        }
      >
        <SectionHeading
          as="h2"
          scale="title"
          className={`shrink-0 text-center ${photoWhiteTextClass}`}
        >
          {nameOrigins.title}
        </SectionHeading>
        <NameOriginsContent />
        <p
          className={`shrink-0 text-balance text-center ${type.slideSubhead} underline ${photoWhiteTextClass}`}
        >
          {nameOrigins.footer}
        </p>
      </PhotoGridOverlay>
    </Section>
  );
}

export function EngineBridgeTransition() {
  return (
    <TransitionBlock
      lines={engineBridge.lines}
      image={siteImages.engineBridge}
      imageAlt="Place and force"
    />
  );
}

const LEARNING_ENGINE_BODY =
  "max-lg:text-white/90 max-lg:[text-shadow:0_1px_2px_rgb(0_0_0_/_0.95),0_2px_8px_rgb(0_0_0_/_0.88),0_4px_20px_rgb(0_0_0_/_0.6)] lg:text-muted lg:[text-shadow:none]";

function LearningParagraph({ text }: { text: string }) {
  if (text.includes("(Insert the link*)")) {
    const parts = text.split("(Insert the link*)");
    const hypatiaHref = learningEngine.hypatiaHref;

    return (
      <ProseParagraph className={LEARNING_ENGINE_BODY}>
        {parts[0]}
        {hypatiaHref ? (
          <a
            href={hypatiaHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`${photoBrandAccentClass} ${externalBodyLinkClass} lg:[text-shadow:none]`}
          >
            Hypatia
          </a>
        ) : (
          <span className="max-lg:text-white/75 lg:text-muted">(Insert the link*)</span>
        )}
        {parts[1] ?? ""}
      </ProseParagraph>
    );
  }
  return <ProseParagraph className={LEARNING_ENGINE_BODY}>{text}</ProseParagraph>;
}

export function LearningEngineSection() {
  return (
    <Section id="learning-engine" padding="none">
      <SectionImageSplit
        image={siteImages.learningEngine}
        alt={learningEngine.title}
        mobileOverlay="learning"
      >
        <SectionHeading className={`max-lg:text-white ${MOBILE_PHOTO_HEADING_SHADOW}`}>
          {learningEngine.title}
        </SectionHeading>
        <div className={`mt-8 w-full space-y-4 text-pretty ${type.slideBodyLg} ${LEARNING_ENGINE_BODY}`}>
          {learningEngine.paragraphs.map((paragraph) => (
            <LearningParagraph key={paragraph} text={paragraph} />
          ))}
        </div>
      </SectionImageSplit>
    </Section>
  );
}

export function FormBridgeTransition() {
  return (
    <TransitionBlock
      lines={formBridge.lines}
      image={siteImages.ecosystemBridge}
      imageAlt="Where intelligence takes form"
    />
  );
}

export function EcosystemSection() {
  return (
    <Section id="ecosystem" padding="none">
      <SectionCoverBackdrop
        image={siteImages.ecosystemBackground}
        alt="Library of Celsus at Ephesus with classical columns and stone facade"
        overlayClassName="bg-background/40 dark:bg-black/50"
      >
        <Container className="py-16 md:py-24 lg:py-28">
          <ContentColumn centered className="mb-12">
            <div className={glassTitlePillClass}>
              <SectionHeading as="h2" scale="title" className={glassTextClass}>
                {ecosystem.title}
              </SectionHeading>
            </div>
            <p className={`mt-4 ${type.slideLead} text-balance ${glassTextClass}`}>
              {ecosystem.subtitle}
            </p>
          </ContentColumn>
          <ContentColumn>
            <div className="space-y-6">
              {ecosystem.items.map((item) => (
                <Card key={item.id} chipSeed={item.id}>
                  <SectionHeading as="h3" scale="lead" className={glassTextClass}>
                    {item.title}
                  </SectionHeading>
                  <div className={`mt-4 space-y-3 ${type.slideBody} ${glassTextClass}`}>
                    {item.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-pretty">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </ContentColumn>
        </Container>
      </SectionCoverBackdrop>
    </Section>
  );
}

const CLOSING_CTA_TEXT =
  "text-white [text-shadow:0_1px_2px_rgb(0_0_0_/_0.95),0_2px_8px_rgb(0_0_0_/_0.88),0_4px_20px_rgb(0_0_0_/_0.6)]";

export function ClosingCtaSection() {
  const image = siteImages.closing;

  return (
    <Section id="join" padding="none">
      <PhotoGridOverlay
        image={image}
        alt="Join Hephaestus International"
        alignClass="justify-end"
        contentClassName="py-16 md:py-20 lg:py-24"
        overlayLayers={
          <>
            <div
              className={`pointer-events-none absolute inset-0 z-[5] ${photoTintClosingClass}`}
              aria-hidden
            />
            <div
              className={`pointer-events-none absolute inset-0 z-[5] ${photoRadialCenterClass}`}
              aria-hidden
            />
            <div
              className={`pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[55%] ${photoGradientBottomClosingClass}`}
              aria-hidden
            />
          </>
        }
      >
        <Container>
          <ContentColumn centered width="narrow">
            <p className={`${type.slideLead} text-balance text-white/95 ${CLOSING_CTA_TEXT}`}>
                {closingCta.lead}
              </p>
              <p className={`mt-8 ${type.slideLead} text-balance ${CLOSING_CTA_TEXT}`}>
                {closingCta.prompt}
              </p>
              <ul
                className={`mt-6 space-y-3 ${type.slideSubhead} text-balance text-white/90 ${CLOSING_CTA_TEXT} [&_li]:text-balance`}
              >
                {closingCta.questions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
              <p className={`mt-8 ${type.slideLead} text-balance ${CLOSING_CTA_TEXT}`}>
                {closingCta.headline}
              </p>
              <p
                className={`mt-4 ${type.slideLead} text-balance text-brand-primary [text-shadow:1.25px_0_0_#fff,-1.25px_0_0_#fff,0_1.25px_0_#fff,0_-1.25px_0_#fff,0_1px_2px_rgb(0_0_0_/_0.9),0_2px_8px_rgb(0_0_0_/_0.75)] dark:[text-shadow:0_1px_2px_rgb(0_0_0_/_0.95),0_2px_8px_rgb(0_0_0_/_0.88),0_4px_20px_rgb(0_0_0_/_0.6)]`}
              >
                {closingCta.tagline}
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Button href={closingCta.primaryHref}>
                  {closingCta.primaryLabel}
                </Button>
                <Button href="/contact" variant="secondary">
                  Contact us
                </Button>
              </div>
            </ContentColumn>
          </Container>
      </PhotoGridOverlay>
    </Section>
  );
}
