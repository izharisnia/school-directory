/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true }
};
// frontend/next.config.js
module.exports = {
  images: {
    domains: ['res.cloudinary.com'], // Cloudinary domain
  }
};
