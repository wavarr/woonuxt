import { createResolver } from '@nuxt/kit';
import { defineNuxtConfig } from 'nuxt/config';
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }
      ],
    }
  },

  components: [{ path: resolve('./app/components'), pathPrefix: false }],

  modules: [
    'nuxt-graphql-client'
  ],

  'graphql-client': {
    clients: {
      default: {
        host: process.env.GRAPHQL_URL || 'https://modaprimeusa.com/graphql',
        headers: {
          'Origin': process.env.FRONT_END_URL || 'https://store.modaprimeusa.com',
          'X-WP-Guest-Access': 'true'
        }
      }
    }
  },

  nitro: {
    preset: 'node-server'
  },

  runtimeConfig: {
    public: {
      GRAPHQL_URL: process.env.GRAPHQL_URL || 'https://modaprimeusa.com/graphql',
      FRONT_END_URL: 'https://store.modaprimeusa.com'
    }
  }
});
