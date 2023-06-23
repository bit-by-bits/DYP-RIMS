/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "xsgames.co",
      "lh3.googleusercontent.com",
      "services.journalchecker.com",
    ],
  },
};

module.exports = nextConfig;
