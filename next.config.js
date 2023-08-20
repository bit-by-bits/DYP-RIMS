/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "cquipsplus.ca",
      "lh3.googleusercontent.com",
      "services.journalchecker.com",
    ],
  },
};

module.exports = nextConfig;
