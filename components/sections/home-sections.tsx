import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Col, Container, Section } from "@/components/layout/container";
import { ContentColumn } from "@/components/layout/content-column";
import { TransitionBlock } from "@/components/sections/transition-block";
import { HeroBackdrop } from "@/components/ui/hero-backdrop";
import {
  imageBleedClass,
  SectionBackdrop,
  SectionCoverBackdrop,
} from "@/components/ui/section-image";
import {
  Eyebrow,
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
  photoGradientBottomHeavyClass,
  photoGradientLeftClass,
  photoGradientVerticalSoftClass,
  photoBrandAccentClass,
  photoRadialCenterClass,
  photoTextColumnScrimClass,
  photoTintClosingClass,
  photoTintMediumClass,
  photoTintStrongClass,
  photoWhiteTextClass,
  photoWhiteTextSoftClass,
} from "@/lib/ui-styles";

export function HeroSection() {
  return (
    <HeroBackdrop
      image={siteImages.heroBackground}
      alt="Hephaestus International presentation hero"
      priority
    >
      <div className="mx-auto w-full max-w-3xl text-center [&_h1]:[text-shadow:0_1px_2px_rgb(0_0_0_/_0.95),0_2px_10px_rgb(0_0_0_/_0.9),0_4px_28px_rgb(0_0_0_/_0.65)] [&_p]:[text-shadow:0_1px_2px_rgb(0_0_0_/_0.95),0_2px_8px_rgb(0_0_0_/_0.88),0_4px_20px_rgb(0_0_0_/_0.6)]">
        <Eyebrow className="text-white">{hero.subtitle}</Eyebrow>
        <SectionHeading as="h1" scale="hero" className="mt-4 text-white">
          {hero.title}
        </SectionHeading>
        <div className={`mt-8 space-y-3 ${type.bodyLarge} text-pretty text-white/90`}>
          {hero.taglines.map((line) => (
            <p key={line} className="text-balance">
              {line}
            </p>
          ))}
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
            <div
              className={`inline-flex ${cardRadiusClass} ${glassSurfaceClass} px-5 py-3`}
            >
              <SectionHeading as="h2" className={glassTextClass}>
                {didYouKnow.leadIn}
              </SectionHeading>
            </div>
          </ContentColumn>
          <ContentColumn width="full">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {didYouKnow.facts.map((fact, index) => (
                <Card key={fact} chipSeed={index} className="h-full min-w-0">
                  <p className={`${type.bodyMedium} text-pretty ${glassTextClass}`}>
                    {fact}
                  </p>
                </Card>
              ))}
            </div>
            <Card chipSeed="did-you-know-closing" className="mt-4 text-center">
              <p className={`${type.titleLarge} text-pretty ${glassTextClass}`}>
                {didYouKnow.closing}
              </p>
            </Card>
          </ContentColumn>
        </Container>
      </SectionCoverBackdrop>
    </Section>
  );
}

export function PositioningSection() {
  return (
    <Section id="positioning" padding="none">
      <SectionBackdrop
        image={siteImages.positioning}
        alt={positioning.title}
        overlay="heavy"
        heightMode="cover"
        coverHeightClass="h-[max(36rem,min(125vw,90rem))]"
        imagePosition="object-center"
        contentClassName="py-12 md:py-16 lg:py-20"
      >
        <Container>
          <Col
            span={12}
            className="[&_h2]:[text-shadow:0_1px_2px_rgb(0_0_0_/_0.95),0_2px_10px_rgb(0_0_0_/_0.9),0_4px_28px_rgb(0_0_0_/_0.65)] [&_p]:[text-shadow:0_1px_2px_rgb(0_0_0_/_0.95),0_2px_8px_rgb(0_0_0_/_0.88),0_4px_20px_rgb(0_0_0_/_0.6)]"
          >
            <SectionHeading className="text-white">
              {positioning.title}
            </SectionHeading>
            <div className="mt-6 w-full md:mt-8">
              <Prose size="lg" className="max-w-none text-white/90">
                {positioning.paragraphs.map((paragraph) => (
                  <ProseParagraph key={paragraph}>
                    {paragraph}
                  </ProseParagraph>
                ))}
              </Prose>
            </div>
          </Col>
        </Container>
      </SectionBackdrop>
    </Section>
  );
}

export function PillarsSection() {
  return (
    <Section id="pillars" padding="none">
      <SectionCoverBackdrop
        image={siteImages.pillarsBackground}
        alt="Circuit board assembly on a manufacturing line"
        overlayClassName={photoCoverOverlayStrongClass}
      >
        <Container className="py-16 md:py-24 lg:py-28">
          <ContentColumn centered className="mb-12">
            <div
              className={`inline-flex ${cardRadiusClass} ${glassSurfaceClass} px-5 py-3`}
            >
              <SectionHeading as="h2" className={glassTextClass}>
                {pillars.title}
              </SectionHeading>
            </div>
          </ContentColumn>
          <ContentColumn width="full">
            <div className="grid gap-6 md:grid-cols-3">
              {pillars.items.map((pillar) => (
                <Card key={pillar.number} chipSeed={pillar.number} className="h-full">
                  <span className={`${type.displaySmall} text-brand-primary`}>
                    {pillar.number}
                  </span>
                  <SectionHeading as="h3" className={`mt-4 ${glassTextClass}`}>
                    {pillar.title}
                  </SectionHeading>
                  <div className={`mt-4 ${type.bodyMedium} ${glassTextClass}`}>
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
  const parts = text.split(lemnosAccentPattern).filter((part) => part.length > 0);

  return (
    <ProseParagraph>
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
    <p className={`${type.bodyLarge} ${NAME_ORIGINS_TEXT} text-center`}>
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
      className={`absolute inset-x-[8%] top-[13%] bottom-[11%] flex flex-col items-center justify-between ${NAME_ORIGINS_TEXT}`}
    >
      {blocks.map((block, index) => (
        <div key={index} className="max-w-[80%] space-y-1 text-center sm:max-w-[75%]">
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
      <div className={`relative isolate ${imageBleedClass}`}>
        <Image
          src={image.src}
          alt={nameOrigins.title}
          width={image.width}
          height={image.height}
          sizes="100vw"
          className="block h-auto w-full"
        />
        <div className={`pointer-events-none absolute inset-0 z-[5] ${photoTintStrongClass}`} aria-hidden />
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
        <div className="absolute inset-0 z-10">
          <SectionHeading
            as="h2"
            className={`absolute inset-x-[8%] top-[5%] text-center ${type.headlineSmall} ${photoWhiteTextClass}`}
          >
            {nameOrigins.title}
          </SectionHeading>
          <NameOriginsContent />
          <p
            className={`absolute inset-x-[8%] bottom-[4%] text-center ${type.labelLarge} underline ${photoWhiteTextClass}`}
          >
            {nameOrigins.footer}
          </p>
        </div>
      </div>
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

const LEARNING_ENGINE_TEXT =
  "text-white [text-shadow:0_1px_2px_rgb(0_0_0_/_0.95),0_2px_8px_rgb(0_0_0_/_0.88),0_4px_20px_rgb(0_0_0_/_0.6)]";

function LearningParagraph({ text }: { text: string }) {
  if (text.includes("Hypatia") && text.includes("(Insert the link*)")) {
    const parts = text.split("(Insert the link*)");
    const hypatiaHref = learningEngine.hypatiaHref;

    return (
      <ProseParagraph className={LEARNING_ENGINE_TEXT}>
        {parts[0]}
        {hypatiaHref ? (
          <a
            href={hypatiaHref}
            className="text-white underline decoration-white/60 underline-offset-2 hover:decoration-white"
          >
            Hypatia
          </a>
        ) : (
          <span className="text-white/75">(Insert the link*)</span>
        )}
        {parts[1] ?? ""}
      </ProseParagraph>
    );
  }
  return <ProseParagraph className={LEARNING_ENGINE_TEXT}>{text}</ProseParagraph>;
}

export function LearningEngineSection() {
  const image = siteImages.learningEngine;
  const coverHeight = "min-h-[max(36rem,min(125vw,90rem))]";

  return (
    <Section id="learning-engine" padding="none">
      <div
        className={`relative isolate overflow-hidden ${imageBleedClass} ${coverHeight}`}
      >
        <Image
          src={image.src}
          alt={learningEngine.title}
          fill
          sizes="100vw"
          className="object-cover object-[38%_center]"
        />
        <div className={`pointer-events-none absolute inset-0 z-[5] ${photoTintMediumClass}`} aria-hidden />
        <div
          className={`pointer-events-none absolute inset-0 z-[5] ${photoGradientLeftClass}`}
          aria-hidden
        />
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[70%] md:h-[65%] ${photoGradientBottomHeavyClass}`}
          aria-hidden
        />
        <div
          className={`relative z-10 flex flex-col justify-end ${coverHeight} py-12 md:py-16 lg:py-20`}
        >
          <Container>
            <Col span={12} className="lg:col-span-8">
              <SectionHeading className={LEARNING_ENGINE_TEXT}>
                {learningEngine.title}
              </SectionHeading>
              <div
                className={`mt-8 w-full space-y-4 text-pretty text-white/90 ${type.bodyLarge} ${LEARNING_ENGINE_TEXT}`}
              >
                {learningEngine.paragraphs.map((paragraph) => (
                  <LearningParagraph key={paragraph} text={paragraph} />
                ))}
              </div>
            </Col>
          </Container>
        </div>
      </div>
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
        alt="Electronic components organized in a parts tray"
        overlayClassName="bg-background/40 dark:bg-black/50"
      >
        <Container className="py-16 md:py-24 lg:py-28">
          <ContentColumn centered className="mb-12">
            <div
              className={`inline-flex ${cardRadiusClass} ${glassSurfaceClass} px-5 py-3`}
            >
              <SectionHeading as="h2" className={glassTextClass}>
                {ecosystem.title}
              </SectionHeading>
            </div>
            <p className={`mt-4 ${type.titleLarge} text-pretty ${glassTextClass}`}>
              {ecosystem.subtitle}
            </p>
          </ContentColumn>
          <ContentColumn>
            <div className="space-y-6">
              {ecosystem.items.map((item) => (
                <Card key={item.id} chipSeed={item.id}>
                  <SectionHeading as="h3" className={glassTextClass}>
                    {item.title}
                  </SectionHeading>
                  <div className={`mt-4 space-y-3 ${type.bodyMedium} ${glassTextClass}`}>
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
      <div className={`relative isolate ${imageBleedClass}`}>
        <Image
          src={image.src}
          alt="Join Hephaestus International"
          width={image.width}
          height={image.height}
          sizes="100vw"
          className="block h-auto w-full"
        />
        <div className={`pointer-events-none absolute inset-0 z-[5] ${photoTintClosingClass}`} aria-hidden />
        <div
          className={`pointer-events-none absolute inset-0 z-[5] ${photoRadialCenterClass}`}
          aria-hidden
        />
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[55%] ${photoGradientBottomClosingClass}`}
          aria-hidden
        />
        <div className="absolute inset-0 z-10 flex flex-col justify-end py-16 md:py-20 lg:py-24">
          <Container>
            <ContentColumn centered width="narrow">
              <p className={`${type.titleLarge} text-pretty text-white/95 ${CLOSING_CTA_TEXT}`}>
                {closingCta.lead}
              </p>
              <p className={`mt-8 ${type.headlineSmall} text-balance ${CLOSING_CTA_TEXT}`}>
                {closingCta.prompt}
              </p>
              <ul
                className={`mt-6 space-y-3 ${type.titleLarge} text-pretty text-white/90 ${CLOSING_CTA_TEXT}`}
              >
                {closingCta.questions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
              <p className={`mt-8 ${type.headlineMedium} text-balance ${CLOSING_CTA_TEXT}`}>
                {closingCta.headline}
              </p>
              <p
                className={`mt-4 ${type.titleLarge} text-balance text-brand-primary [text-shadow:1.25px_0_0_#fff,-1.25px_0_0_#fff,0_1.25px_0_#fff,0_-1.25px_0_#fff,0_1px_2px_rgb(0_0_0_/_0.9),0_2px_8px_rgb(0_0_0_/_0.75)] dark:[text-shadow:0_1px_2px_rgb(0_0_0_/_0.95),0_2px_8px_rgb(0_0_0_/_0.88),0_4px_20px_rgb(0_0_0_/_0.6)]`}
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
        </div>
      </div>
    </Section>
  );
}
