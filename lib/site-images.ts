/** Approved raster assets extracted from Hephaestus International. Version 3.pdf */
export type SiteImageAsset = {
  src: string;
  width: number;
  height: number;
};

export const siteImages = {
  heroBackground: {
    src: "/images/hero-background.webp",
    width: 1440,
    height: 980,
  },
  didYouKnowBackground: {
    src: "/images/did-you-know-lemnos.webp",
    width: 1024,
    height: 768,
  },
  pillarsBackground: {
    src: "/images/pillars-background.webp",
    width: 1024,
    height: 682,
  },
  positioning: {
    src: "/images/positioning.webp",
    width: 800,
    height: 1200,
  },
  rootsTransition: {
    src: "/images/roots-transition.webp",
    width: 1440,
    height: 812,
  },
  mappingLegacy: {
    src: "/images/mapping-legacy.webp",
    width: 1364,
    height: 768,
  },
  lemnos: {
    src: "/images/lemnos-coast.webp",
    width: 1024,
    height: 575,
  },
  nameBridge: {
    src: "/images/name-bridge.webp",
    width: 1440,
    height: 812,
  },
  nameOrigins: {
    src: "/images/name-origins.webp",
    width: 1295,
    height: 1093,
  },
  engineBridge: {
    src: "/images/engine-bridge.webp",
    width: 1440,
    height: 812,
  },
  learningEngine: {
    src: "/images/learning-engine.webp",
    width: 600,
    height: 1200,
  },
  ecosystemBridge: {
    src: "/images/ecosystem-bridge.webp",
    width: 1440,
    height: 812,
  },
  ecosystemBackground: {
    src: "/images/ecosystem-background.webp",
    width: 1024,
    height: 683,
  },
  closing: {
    src: "/images/closing.webp",
    width: 1024,
    height: 578,
  },
} as const satisfies Record<string, SiteImageAsset>;
