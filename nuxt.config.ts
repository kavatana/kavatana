import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  alias: {
    '~': fileURLToPath(new URL('./', import.meta.url)),
    '@content': fileURLToPath(new URL('./content', import.meta.url)),
    '@assets': fileURLToPath(new URL('./assets', import.meta.url))
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'kavatana',
      meta: [
        { name: 'theme-color', content: '#0c0c0f' }
      ],
      script: process.env.NODE_ENV === 'production' ? [
        {
          src: 'https://plausible.io/js/pa-6-q4Va4bm5e9BpiJU-RZS.js',
          async: true
        },
        {
          innerHTML: 'window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()'
        }
      ] : []
    }
  },
  ssr: false,
  site: {
    url: 'https://kavatana.me',
    name: 'kavatana'
  },
  modules: ['@nuxtjs/sitemap'],
  nitro: {
    prerender: {
      routes: ['/', '/about', '/projects', '/projects/bayonhub', '/contact']
    }
  },
  css: ['@assets/styles/tokens.css', '@assets/styles/base.css']
})
