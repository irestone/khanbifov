module.exports = {
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}
