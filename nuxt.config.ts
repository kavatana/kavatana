import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  alias: {
    '~': fileURLToPath(new URL('./', import.meta.url)),
    '@content': fileURLToPath(new URL('./content', import.meta.url)),
    '@assets': fileURLToPath(new URL('./assets', import.meta.url))
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
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
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap' }
      ],
      script: [
        {
          innerHTML: `
            (function() {
              try {
                var stored = localStorage.getItem('theme');
                if (stored === 'dark' || stored === 'light') {
                  document.documentElement.setAttribute('data-theme', stored);
                } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch (e) {}
            })();
          `
        },
        ...(process.env.NODE_ENV === 'production' ? [
          {
            src: 'https://plausible.io/js/pa-6-q4Va4bm5e9BpiJU-RZS.js',
            async: true
          },
          {
            innerHTML: 'window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()'
          }
        ] : [])
      ]
    }
  },
  ssr: true,
  site: {
    url: 'https://kavatana.me',
    name: 'Ka Vatana'
  },
  modules: ['@nuxtjs/sitemap'],
  nitro: {
    prerender: {
      routes: ['/', '/about', '/journey', '/contact', '/projects', '/projects/chomkar', '/projects/bayonhub', '/projects/phsaros', '/projects/svaeng-yul', '/projects/studio-os', '/projects/kavatana-portfolio', '/projects/cyber-arena-team-os']
    }
  },
  css: ['@assets/styles/tokens.css', '@assets/styles/base.css']
})
