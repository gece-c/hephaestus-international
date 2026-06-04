import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Col, Container, Section } from "@/components/layout/container";
import { ContentColumn } from "@/components/layout/content-column";
import { TransitionBlock } from "@/components/sections/transition-block";
import { HeroBackdrop } from "@/components/ui/hero-backdrop";
import { imageBleedClass, SectionBackdrop } from "@/components/ui/section-image";
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

export function HeroSection() {
  return (
    <HeroBackdrop
      image={siteImages.heroBackground}
      alt="Hephaestus International presentation hero"
      priority
    >
      <div className="mx-auto w-full max-w-3xl text-center [&_h1]:[text-shadow:0_1px_2px_rgb(0_0_0_/_0.95),0_2px_10px_rgb(0_0_0_/_0.9),0_4px_28px_rgb(0_0_0_/_0.65)] [&_p]:[text-shadow:0_1px_2px_rgb(0_0_0_/_0.95),0_2px_8px_rgb(0_0_0_/_0.88),0_4px_20px_rgb(0_0_0_/_0.6)]">
        <Eyebrow className="text-white">{hero.subtitle}</Eyebrow>
        <SectionHeading as="h1" className="mt-4 text-white">
          {hero.title}
        </SectionHeading>
        <div className="mt-8 space-y-3 text-lg text-pretty text-white/90 md:text-xl">
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
    <Section id="did-you-know" variant="muted">
      <Container>
        <ContentColumn centered className="mb-8">
          <SectionHeading as="h2" className="text-2xl md:text-3xl">
            {didYouKnow.leadIn}
          </SectionHeading>
        </ContentColumn>
        <ContentColumn width="full">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {didYouKnow.facts.map((fact) => (
              <Card key={fact} className="h-full min-w-0">
                <p className="text-sm leading-relaxed text-pretty md:text-base">
                  {fact}
                </p>
              </Card>
            ))}
          </div>
          <Card className="mt-4">
            <p className="text-base leading-relaxed text-pretty font-medium md:text-lg">
              {didYouKnow.closing}
            </p>
          </Card>
        </ContentColumn>
      </Container>
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
        contentClassName="py-12 md:py-16 lg:py-20"
      >
        <Container>
          <Col
            span={12}
            className="[&_h2]:[text-shadow:0_1px_2px_rgb(0_0_0_/_0.95),0_2px_10px_rgb(0_0_0_/_0.9),0_4px_28px_rgb(0_0_0_/_0.65)] [&_p]:[text-shadow:0_1px_2px_rgb(0_0_0_/_0.95),0_2px_8px_rgb(0_0_0_/_0.88),0_4px_20px_rgb(0_0_0_/_0.6)]"
          >
            <SectionHeading className="text-white md:text-4xl lg:text-5xl">
              {positioning.title}
            </SectionHeading>
            <div className="mt-6 w-full md:mt-8">
              <Prose
                size="lg"
                className="max-w-none text-lg text-white/90 md:text-xl lg:text-2xl"
              >
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
    <Section id="pillars" variant="accent">
      <Container>
        <ContentColumn centered className="mb-12">
          <SectionHeading>{pillars.title}</SectionHeading>
        </ContentColumn>
        <ContentColumn>
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.items.map((pillar) => (
              <Card key={pillar.number} className="h-full">
                <span className="text-3xl font-bold text-brand-primary">
                  {pillar.number}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-balance">
                  {pillar.title}
                </h3>
                <div className="mt-4 text-sm text-muted">
                  {pillar.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-pretty leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </ContentColumn>
      </Container>
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
        overlay="none"
      >
        <Container>
          <ContentColumn
            centered
            className="[&_h2]:[text-shadow:0_1px_2px_rgb(0_0_0_/_0.95),0_2px_10px_rgb(0_0_0_/_0.9),0_4px_28px_rgb(0_0_0_/_0.65)]"
          >
            <SectionHeading
              as="h2"
              className="text-2xl text-white md:text-3xl lg:text-4xl"
            >
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
        contentClassName="py-12 md:py-16 lg:py-20"
      >
        <Container>
          <Col span={12} className="lg:col-span-9">
            <SectionHeading className="text-white drop-shadow-md lg:text-5xl">
              {lemnos.title}
            </SectionHeading>
            <div className="mt-6 md:mt-8">
              <Prose className="text-base text-white/90 md:text-lg [&_p]:drop-shadow-sm">
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

const NAME_ORIGINS_TEXT =
  "text-white [text-shadow:0_1px_2px_rgb(0_0_0_/_0.95),0_2px_8px_rgb(0_0_0_/_0.88),0_4px_20px_rgb(0_0_0_/_0.6)]";

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
  align,
}: {
  text: string;
  accents: readonly string[];
  align: "left" | "right";
}) {
  const parts = text
    .split(nameOriginsAccentPattern(accents))
    .filter((part) => part.length > 0);

  return (
    <p
      className={`text-xs font-semibold leading-snug sm:text-sm md:text-base lg:text-lg ${NAME_ORIGINS_TEXT} ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {parts.map((part, index) =>
        (accents as readonly string[]).includes(part) ? (
          <span
            key={`${part}-${index}`}
            className="text-brand-primary [text-shadow:1.25px_0_0_#fff,-1.25px_0_0_#fff,0_1.25px_0_#fff,0_-1.25px_0_#fff] dark:[text-shadow:none]"
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

function NameOriginsZigzag() {
  const blocks = nameOrigins.leftBlocks.flatMap((leftLines, index) => [
    {
      lines: leftLines,
      align: "left" as const,
      accents: NAME_ORIGINS_LEFT_ACCENTS,
    },
    {
      lines: nameOrigins.rightBlocks[index],
      align: "right" as const,
      accents: NAME_ORIGINS_RIGHT_ACCENTS,
    },
  ]);

  return (
    <div
      className={`absolute inset-x-[5%] top-[13%] bottom-[11%] flex flex-col justify-between ${NAME_ORIGINS_TEXT}`}
    >
      {blocks.map((block, index) => (
        <div
          key={`${block.align}-${index}`}
          className={`max-w-[50%] space-y-0.5 ${
            block.align === "right" ? "self-end text-right" : "self-start text-left"
          }`}
        >
          {block.lines.map((line) => (
            <NameOriginsAccentLine
              key={line}
              text={line}
              accents={block.accents}
              align={block.align}
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
        <div
          className="pointer-events-none absolute inset-0 z-[5] bg-black/28 dark:bg-black/50"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_75%_55%_at_32%_42%,rgba(0,0,0,0.38),transparent_75%)] dark:bg-[radial-gradient(ellipse_75%_55%_at_32%_42%,rgba(0,0,0,0.55),transparent_72%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-black/18 via-black/8 to-black/22 dark:from-black/60 dark:via-black/50 dark:to-black/55"
          aria-hidden
        />
        <div className="absolute inset-0 z-10">
          <SectionHeading
            as="h2"
            className={`absolute inset-x-[8%] top-[5%] text-center text-base font-bold sm:text-lg md:text-2xl lg:text-3xl ${NAME_ORIGINS_TEXT}`}
          >
            {nameOrigins.title}
          </SectionHeading>
          <NameOriginsZigzag />
          <p
            className={`absolute inset-x-[8%] bottom-[4%] text-center text-xs font-bold underline sm:text-sm md:text-base lg:text-lg ${NAME_ORIGINS_TEXT}`}
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
  if (text.includes("Hypatia")) {
    const parts = text.split("(Insert the link*)");
    return (
      <ProseParagraph className={LEARNING_ENGINE_TEXT}>
        {parts[0]}
        <span className="text-white/75">(Insert the link*)</span>
        {parts[1] ?? ""}
      </ProseParagraph>
    );
  }
  return <ProseParagraph className={LEARNING_ENGINE_TEXT}>{text}</ProseParagraph>;
}

export function LearningEngineSection() {
  const image = siteImages.learningEngine;

  return (
    <Section id="learning-engine" padding="none">
      <div className={`relative isolate ${imageBleedClass}`}>
        <Image
          src={image.src}
          alt={learningEngine.title}
          width={image.width}
          height={image.height}
          sizes="100vw"
          className="block h-auto w-full"
        />
        <div
          className="pointer-events-none absolute inset-0 z-[5] bg-black/18 dark:bg-black/30"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-r from-black/45 via-black/22 to-black/8 dark:from-black/55 dark:via-black/30 dark:to-black/10"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[70%] bg-gradient-to-t from-black/60 via-black/35 to-transparent md:h-[65%] dark:from-black/65 dark:via-black/40"
          aria-hidden
        />
        <div className="absolute inset-0 z-10 flex flex-col justify-end py-12 md:py-16 lg:py-20">
          <Container>
            <Col span={12} className="lg:col-span-8">
              <SectionHeading
                className={`text-3xl md:text-4xl lg:text-5xl ${LEARNING_ENGINE_TEXT}`}
              >
                {learningEngine.title}
              </SectionHeading>
              <div
                className={`mt-8 w-full space-y-4 text-pretty text-base leading-relaxed text-white/90 md:text-lg ${LEARNING_ENGINE_TEXT}`}
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
    <Section id="ecosystem">
      <Container>
        <ContentColumn centered className="mb-12">
          <SectionHeading>{ecosystem.title}</SectionHeading>
          <p className="mt-4 text-lg text-muted text-pretty">
            {ecosystem.subtitle}
          </p>
        </ContentColumn>
        <ContentColumn>
          <div className="space-y-6">
            {ecosystem.items.map((item) => (
              <Card key={item.id}>
                <SectionHeading as="h3">{item.title}</SectionHeading>
                <div className="mt-4 space-y-3 text-sm text-muted md:text-base">
                  {item.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-pretty leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </ContentColumn>
      </Container>
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
        <div
          className="pointer-events-none absolute inset-0 z-[5] bg-black/22 dark:bg-black/35"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_65%_55%_at_50%_42%,rgba(0,0,0,0.5),transparent_72%)] dark:bg-[radial-gradient(ellipse_65%_55%_at_50%_42%,rgba(0,0,0,0.6),transparent_72%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[55%] bg-gradient-to-t from-black/65 via-black/35 to-transparent dark:from-black/75 dark:via-black/45"
          aria-hidden
        />
        <div className="absolute inset-0 z-10 flex flex-col justify-end py-16 md:py-20 lg:py-24">
          <Container>
            <ContentColumn centered width="narrow">
              <p
                className={`text-lg text-pretty text-white/95 md:text-xl ${CLOSING_CTA_TEXT}`}
              >
                {closingCta.lead}
              </p>
              <p
                className={`mt-8 text-xl font-semibold text-balance md:text-2xl ${CLOSING_CTA_TEXT}`}
              >
                {closingCta.prompt}
              </p>
              <ul
                className={`mt-6 space-y-3 text-lg text-pretty text-white/90 md:text-xl ${CLOSING_CTA_TEXT}`}
              >
                {closingCta.questions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
              <p
                className={`mt-8 text-2xl font-bold text-balance md:text-3xl ${CLOSING_CTA_TEXT}`}
              >
                {closingCta.headline}
              </p>
              <p
                className={`mt-4 text-lg font-semibold text-balance text-brand-primary [text-shadow:1.25px_0_0_#fff,-1.25px_0_0_#fff,0_1.25px_0_#fff,0_-1.25px_0_#fff,0_1px_2px_rgb(0_0_0_/_0.9),0_2px_8px_rgb(0_0_0_/_0.75)] dark:[text-shadow:0_1px_2px_rgb(0_0_0_/_0.95),0_2px_8px_rgb(0_0_0_/_0.88),0_4px_20px_rgb(0_0_0_/_0.6)]`}
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
