import { createResolver } from '@nuxt/kit';
const { resolve } = createResolver(import.meta.url);

// Define the GraphQL endpoint once to ensure consistency
const GQL_HOST = process.env.GQL_HOST || 'https://modaprimeusa.com/graphql';
const APP_HOST = process.env.APP_HOST || 'https://store.modaprimeusa.com';

export default defineNuxtConfig({
  compatibilityDate: '2024-12-26',
  future: {
    compatibilityVersion: 4,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
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

  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
        global: true
      }
    ]
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'woonuxt-settings',
    'nuxt-graphql-client',
    '@nuxt/icon',
    '@nuxtjs/i18n'
  ],

  'graphql-client': {
    clients: {
      default: {
        host: GQL_HOST,
        clientHost: APP_HOST, // Explicitly set clientHost
        corsOptions: { 
          mode: 'cors', 
          credentials: 'include' 
        },
        headers: {
          'Origin': APP_HOST,
          'X-WP-Guest-Access': 'true',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Referer': APP_HOST
        },
        proxyCookies: true, // Enable cookie proxying to ensure session persistence
        retainToken: true, // Ensure tokens are retained client-side
        tokenStorage: { mode: 'cookie' } // Use cookies for token storage
      },
    },
    watch: true,
    autoImport: true,
    preferGETQueries: false
  },

  alias: {
    '#imports': './.nuxt/imports',
    '#app': './.nuxt/app',
    '~': './app',
    '@': './app',
    '#constants': resolve('./app/constants'),
    '#woo': '../.nuxt/gql/default',
  },

  hooks: {
    'pages:extend'(pages) {
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
    },
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
      "graphql-client": {
        clients: {
          default: {
            host: GQL_HOST,
            clientHost: APP_HOST, // Explicitly set clientHost
            headers: {
              Origin: APP_HOST,
              "X-WP-Guest-Access": "true",
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Referer": APP_HOST
            },
            proxyCookies: true, // Enable cookie proxying to ensure session persistence
            retainToken: true, // Ensure tokens are retained client-side
            tokenStorage: { mode: 'cookie' } // Use cookies for token storage
          }
        }
      }
    }
  },

  typescript: {
    strict: true,
    typeCheck: false,
    shim: false
  },

  build: {
    transpile: ['vue-i18n']
  },

  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }
  },

  imports: {
    autoImport: true,
    dirs: [
      'composables/**',
      'components/**'
    ]
  },

  routeRules: {
    '/': { prerender: true },
    '/products/**': { 
      swr: 3600,
      cache: {
        maxAge: 3600,
        staleMaxAge: 86400
      }
    },
    '/checkout/order-received/**': { ssr: false },
    '/order-summary/**': { ssr: false },
  },
});
