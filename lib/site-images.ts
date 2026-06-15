/** Approved raster assets extracted from Hephaestus International. Version 3.pdf */
import { withBasePath } from "@/lib/site-url";

export type SiteImageAsset = {
  src: string;
  width: number;
  height: number;
};

function asset(path: string, width: number, height: number): SiteImageAsset {
  return { src: withBasePath(path), width, height };
}

export const siteImages = {
  heroBackground: asset("/images/hero-background.webp", 1440, 980),
  didYouKnowBackground: asset("/images/did-you-know-lemnos.webp", 1024, 768),
  pillarsBackground: asset("/images/pillars-background.webp", 1024, 682),
  positioning: asset("/images/positioning.webp", 800, 1200),
  rootsTransition: asset("/images/roots-transition.webp", 1440, 812),
  mappingLegacy: asset("/images/mapping-legacy.webp", 1364, 768),
  lemnos: asset("/images/lemnos-coast.webp", 1024, 575),
  nameBridge: asset("/images/name-bridge.webp", 1440, 812),
  nameOrigins: asset("/images/name-origins.webp", 1295, 1093),
  engineBridge: asset("/images/engine-bridge.webp", 1440, 812),
  learningEngine: asset("/images/learning-engine.webp", 600, 1200),
  ecosystemBridge: asset("/images/ecosystem-bridge.webp", 1440, 812),
  ecosystemBackground: asset("/images/ecosystem-background.webp", 1024, 683),
  closing: asset("/images/closing.webp", 1024, 578),
  internshipsBackground: asset("/images/internships-background.webp", 819, 1024),
} as const satisfies Record<string, SiteImageAsset>;
