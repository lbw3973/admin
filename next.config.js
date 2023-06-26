/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d23znr2pczcvf6.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "d2ky5wm6akosox.cloudfront.net",
      },
    ],
  },
};

module.exports = nextConfig;
