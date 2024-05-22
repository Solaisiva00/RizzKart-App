/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.unsplash.com" },{hostname:"th.bing.com"}],
  },
};

export default nextConfig;
