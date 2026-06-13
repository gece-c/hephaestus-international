import type { NextConfig } from "next";
import { basePath, isGithubPages } from "./lib/site-url";

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        output: "export",
        basePath,
        assetPrefix: basePath ? `${basePath}/` : undefined,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        async redirects() {
          return [
            {
              source: "/blogs",
              destination: "/gallery",
              permanent: true,
            },
          ];
        },
      }),
};

export default nextConfig;
