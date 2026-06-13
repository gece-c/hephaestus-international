import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blogs",
        destination: "/gallery",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
