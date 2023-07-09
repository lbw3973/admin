/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["moneybridge.s3.ap-northeast-2.amazonaws.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.moneybridge.co.kr/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
