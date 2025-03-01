import { createResolver } from '@nuxt/kit';
import { defineNuxtConfig } from 'nuxt/config';
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  compatibilityDate: '2024-12-26',
  future: {
    compatibilityVersion: 4,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'apple-touch-icon-precomposed', href: '/apple-touch-icon-precomposed.png' }
      ],
    },
    pageTransition: { name: 'page', mode: 'default' },
  },

  experimental: {
    sharedPrerenderData: true,
    buildCache: true,
    defaults: {
      nuxtLink: {
        prefetch: true,
        prefetchOn: { visibility: false },
      },
    },
  },

  plugins: [resolve('./app/plugins/init.ts')],

  components: [{ path: resolve('./app/components'), pathPrefix: false }],

  modules: [
    'woonuxt-settings',
    'nuxt-graphql-client',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/i18n'
  ],

  'graphql-client': {
    codegen: {
      skipTypesGeneration: true,
      generates: {
        './types/graphql.ts': {
          plugins: ['typescript', 'typescript-operations']
        }
      }
    },
    clients: {
      default: {
        host: process.env.GRAPHQL_URL || 'https://modaprimeusa.com/graphql',
        corsOptions: { 
          mode: 'cors', 
          credentials: 'include' 
        },
        headers: {
          'Origin': process.env.FRONT_END_URL || 'https://store.modaprimeusa.com',
          'X-WP-Guest-Access': 'true'
        },
        proxyCookies: false
      },
    },
  },

  alias: {
    '#constants': resolve('./app/constants'),
    '#woo': '../.nuxt/gql/default',
  },

  hooks: {
    'pages:extend'(pages: any) {
      const addPage = (name: string, path: string, file: string) => {
        pages.push({ name, path, file: resolve(`./app/pages/${file}`) });
      };

      addPage('product-page-pager', '/products/page/:pageNumber', 'products.vue');
      addPage('product-category-page', '/product-category/:categorySlug', 'product-category/[slug].vue');
      addPage('product-category-page-pager', '/product-category/:categorySlug/page/:pageNumber', 'product-category/[slug].vue');
      addPage('order-received', '/checkout/order-received/:orderId', 'order-summary.vue');
      addPage('order-summary', '/order-summary/:orderId', 'order-summary.vue');
    },
  },

  nitro: {
    routeRules: {
      '/': { prerender: true },
      '/products/**': { swr: 3600 },
      '/checkout/order-received/**': { ssr: false },
      '/order-summary/**': { ssr: false },
      '/api/**': { cors: true }
    },
  },

  // Handle 404 and other errors gracefully
  routeRules: {
    '/products': { static: false },
    '/products/**': { static: false }
  },

  // Multilingual support
  i18n: {
    locales: [
      { code: 'en_US', file: 'en-US.json', name: 'English 🇺🇸' },
      { code: 'de_DE', file: 'de-DE.json', name: 'Deutsch 🇩🇪' },
      { code: 'es_ES', file: 'es-ES.json', name: 'Español 🇪🇸' },
      { code: 'fr_FR', file: 'fr-FR.json', name: 'Français 🇫🇷' },
      { code: 'it_IT', file: 'it-IT.json', name: 'Italiano 🇮🇹' },
      { code: 'pt_BR', file: 'pt-BR.json', name: 'Português 🇧🇷' },
    ],
    langDir: 'locales',
    defaultLocale: 'en_US',
    strategy: 'no_prefix',
  },

  runtimeConfig: {
    public: {
      GRAPHQL_URL: process.env.GRAPHQL_URL || 'https://your-wordpress-site.com/graphql',
      FRONT_END_URL: 'https://store.modaprimeusa.com',
      PRODUCTS_PER_PAGE: 15,
      "graphql-client": {
        clients: {
          default: {
            host: "https://modaprimeusa.com/graphql",
            headers: {
              Origin: "https://store.modaprimeusa.com",
              "X-WP-Guest-Access": "true"
            },
            proxyCookies: false
          }
        }
      }
    }
  },

  build: {
    transpile: [
      '@apollo/client',
      '@vue/apollo-composable',
      'ts-invariant/process'
    ]
  },
});
