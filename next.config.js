/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com",
      "lh3.googleusercontent.com",
      "services.journalchecker.com",
    ],
  },
};

module.exports = nextConfig;
