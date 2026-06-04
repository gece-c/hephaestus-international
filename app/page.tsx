import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  HeroSection,
  DidYouKnowSection,
  PositioningSection,
  PillarsSection,
  RootsTransition,
  MappingLegacySection,
  LemnosSection,
  NameBridgeTransition,
  NameOriginsSection,
  EngineBridgeTransition,
  LearningEngineSection,
  FormBridgeTransition,
  EcosystemSection,
  ClosingCtaSection,
} from "@/components/sections/home-sections";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <DidYouKnowSection />
        <PositioningSection />
        <PillarsSection />
        <RootsTransition />
        <MappingLegacySection />
        <LemnosSection />
        <NameBridgeTransition />
        <NameOriginsSection />
        <EngineBridgeTransition />
        <LearningEngineSection />
        <FormBridgeTransition />
        <EcosystemSection />
        <ClosingCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
