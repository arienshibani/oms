import type { NextConfig } from "next";

const repoBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: repoBasePath || undefined,
  assetPrefix: repoBasePath || undefined,
};

export default nextConfig;
