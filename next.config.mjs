/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable built-in Image Optimization for Netlify
  images: {
    unoptimized: true,
  },
  // Ensure URLs have trailing slashes for Netlify routing
  trailingSlash: true,
};

export default nextConfig;
