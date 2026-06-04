/** Approved raster assets extracted from Hephaestus International. Version 3.pdf */
export type SiteImageAsset = {
  src: string;
  width: number;
  height: number;
};

export const siteImages = {
  heroBackground: {
    src: "/images/hero-background.jpeg",
    width: 1440,
    height: 980,
  },
  positioning: {
    src: "/images/positioning.jpeg",
    width: 800,
    height: 1200,
  },
  rootsTransition: {
    src: "/images/roots-transition.jpeg",
    width: 1440,
    height: 812,
  },
  mappingLegacy: {
    src: "/images/mapping-legacy.jpeg",
    width: 1364,
    height: 768,
  },
  lemnos: {
    src: "/images/lemnos.jpeg",
    width: 656,
    height: 1200,
  },
  nameBridge: {
    src: "/images/name-bridge.jpeg",
    width: 1440,
    height: 812,
  },
  nameOrigins: {
    src: "/images/name-origins.jpeg",
    width: 1295,
    height: 1093,
  },
  engineBridge: {
    src: "/images/engine-bridge.jpeg",
    width: 1440,
    height: 812,
  },
  learningEngine: {
    src: "/images/learning-engine.jpeg",
    width: 600,
    height: 1200,
  },
  ecosystemBridge: {
    src: "/images/ecosystem-bridge.jpeg",
    width: 1440,
    height: 812,
  },
  closing: {
    src: "/images/closing.jpeg",
    width: 1024,
    height: 578,
  },
} as const satisfies Record<string, SiteImageAsset>;
