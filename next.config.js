/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs');

const SentryWebpackPluginOptions = { silent: true };

const isDevelopment = process.env.NODE_ENV === 'development';
const appHeaders = require('./config/next/headers');
const redirects = require('./config/next/redirects');

const nextConfig = {
  compress: true,
  reactStrictMode: true,
  crossOrigin: 'anonymous',
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      // google avatar
      { hostname: 'lh3.googleusercontent.com' },
      // github avatar
      { hostname: 'avatars.githubusercontent.com' },
      { hostname: 'i.scdn.co' },
      { hostname: 'spotify.com' },
      { hostname: 'res.cloudinary.com' },
      { hostname: 'ui-avatars.com' },
    ],
  },
  async headers() {
    return appHeaders;
  },
  async redirects() {
    return redirects;
  },
};

module.exports = isDevelopment
  ? nextConfig
  : withSentryConfig(nextConfig, SentryWebpackPluginOptions);
