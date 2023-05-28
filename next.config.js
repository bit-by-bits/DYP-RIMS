/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "dreamvilla.life",
      "services.journalchecker.com",
    ],
  },
};

module.exports = nextConfig;
