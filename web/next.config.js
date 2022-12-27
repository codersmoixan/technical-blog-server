const withPlugins = require('next-compose-plugins')
const withVideos = require('next-videos')

module.exports = withPlugins([withVideos], {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    APP_ENV: process.env.APP_ENV,
    BASE_API_URL: process.env.BASE_API_URL
  }
})
