/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.unsplash.com" },{hostname:"th.bing.com"},{hostname:"lh3.googleusercontent.com" },{hostname:"img.icons8.com"}],
  },
};

export default nextConfig;
