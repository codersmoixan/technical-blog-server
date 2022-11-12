/** @type {import('next').NextConfig} */
const withVideos = require('next-videos')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  withVideos: require('next-videos')
}

module.exports = withVideos()
