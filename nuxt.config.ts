// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: [],

  css: [
    '~/assets/scss/main.scss'
  ],

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'es'
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Montserrat:wght@400;500;600;700&display=swap'
        }
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Vive Patrimonio, bar y restaurante frente al río Sinú. Disfruta bebidas, sabores típicos, tours en lancha y atardeceres inolvidables en Magangué, Colombia.' },
        { name: 'theme-color', content: '#123b32' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Vive Patrimonio' },
        { property: 'og:title', content: 'Vive Patrimonio | Bar y Restaurante Río Sinú' },
        { property: 'og:description', content: 'Vive Patrimonio, bar y restaurante frente al río Sinú. Disfruta bebidas, sabores típicos, tours en lancha y atardeceres inolvidables en Magangué, Colombia.' },
        { property: 'og:image', content: 'https://vivepatrimonio.com.co/img/hero.jpg' },
        { property: 'og:url', content: 'https://vivepatrimonio.com.co/' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Vive Patrimonio | Bar y Restaurante Río Sinú' },
        { name: 'twitter:description', content: 'Vive Patrimonio, bar y restaurante frente al río Sinú. Disfruta bebidas, sabores típicos, tours en lancha y atardeceres inolvidables en Magangué, Colombia.' },
        { name: 'twitter:image', content: 'https://vivepatrimonio.com.co/img/hero.jpg' }
      ]
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/variables.scss" as *;
            @use "~/assets/scss/mixins.scss" as *;
          `
        }
      }
    }
  },

  nitro: {
    preset: 'netlify'
  }
})