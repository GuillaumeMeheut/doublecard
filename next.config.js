const { i18n } = require('./next-i18next.config')
const withOptimizedImages = require('next-optimized-images')

module.exports = {
  i18n,
  images: {
    domains: ['picsum.photos'],
  },
  api: { path: './src/pages/api' },
}

module.exports = withOptimizedImages({
  handleImages: ['jpeg', 'png', 'svg'],
})
