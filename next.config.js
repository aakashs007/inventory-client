/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    reactHost: process.env.reactHost,
    protocol: process.env.protocol
  }
}

module.exports = nextConfig
