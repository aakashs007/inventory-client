/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    reactHost: "localhost:3000",
    protocol: "http"
  }
}

module.exports = nextConfig
