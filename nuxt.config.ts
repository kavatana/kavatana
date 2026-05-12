// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    '~/': '/src/',
    '@content': '/content',
    '@assets': '/assets'
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'kavatana',
      themeColor: '#0c0c0f'
    }
  },
  ssr: false,
  nitro: {
    prerender: {
      routes: ['/', '/about', '/projects', '/projects/bayonhub', '/contact']
    }
  },
  css: ['@assets/styles/tokens.css', '@assets/styles/base.css']
})
