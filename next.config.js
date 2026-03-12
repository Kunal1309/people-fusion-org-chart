/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "worksync.global",
        pathname: "/storage/**",
      },
    ],
  },
};

module.exports = nextConfig;
