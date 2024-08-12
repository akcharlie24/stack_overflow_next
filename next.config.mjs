/** @type {import('next').NextConfig} */
const nextConfig = {
  // needed to serve images from given domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
  },
};

export default nextConfig;
