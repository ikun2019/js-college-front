/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com', 'prod-files-secure.s3.us-west-2.amazonaws.com']
  },
};

export default nextConfig;
