/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    APP_BUCKET_NAME: process.env.APP_BUCKET_NAME ?? "",
    APP_REGION: process.env.APP_REGION ?? "",
    APP_ACCESS_KEY_ID: process.env.APP_ACCESS_KEY_ID ?? "",
    APP_SECRET_ACCESS_KEY: process.env.APP_SECRET_ACCESS_KEY ?? "",
    APP_S3URL: process.env.APP_S3URL ?? "",
  },
};

module.exports = nextConfig;
