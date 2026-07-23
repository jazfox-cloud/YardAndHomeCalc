/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  generateBuildId: async () =>
    process.env.CF_PAGES_COMMIT_SHA?.slice(0, 20) ?? "yard-and-home-calc"
};

export default nextConfig;
