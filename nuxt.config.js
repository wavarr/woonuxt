// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  // Get all the pages, components, composables and plugins from the parent theme
  extends: ['./woonuxt_base'],

  components: [{ path: './components', pathPrefix: false }],

  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    'nuxt-graphql-client',
    '@nuxt/icon',
    '@nuxt/image'
  ],

  i18n: {
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        file: 'en.json'
      }
    ],
    vueI18n: './i18n.config.ts'
  },

  runtimeConfig: {
    public: {
      siteTitle: 'ModaPrime USA',
      siteDescription: 'Premium Modafinil',
      siteShortDescription: 'fast, friendly, focused. modaprime',
      siteImage: '/images/placeholder.jpg',
      frontendUrl: process.env.FRONTEND_URL || 'https://store.modaprimeusa.com',
      // Force use of fallback data
      useLocalData: true
    }
  },

  // Override GraphQL client configuration to use fallback data
  'graphql-client': {
    clients: {
      default: {
        host: process.env.GQL_HOST || 'https://modaprimeusa.com/graphql',
        // Enable fallback mode
        preferLocalData: true,
        retainLocalData: true,
        // Add headers for authentication and CORS
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'https://store.modaprimeusa.com',
          'Referer': 'https://store.modaprimeusa.com'
        },
        // CORS settings
        corsOptions: {
          mode: 'cors',
          credentials: 'include',
          withCredentials: true
        },
        // Handle errors gracefully
        errorPolicy: 'all'
      },
    },
  },

  // Add cookie handling for all cookies
  cookieControl: {
    cookies: {
      necessary: [
        {
          name: 'wp_woocommerce_session',
          description: 'WooCommerce session cookie',
          path: '/'
        },
        {
          name: 'wordpress_test_cookie',
          description: 'WordPress test cookie',
          path: '/'
        },
        {
          name: 'wp_lang',
          description: 'WordPress language cookie',
          path: '/'
        },
        {
          name: '__ssid',
          description: 'Session ID cookie',
          path: '/'
        },
        {
          name: '__stripe_mid',
          description: 'Stripe cookie',
          path: '/'
        },
        {
          name: 'sbjs_current',
          description: 'Source tracking cookie',
          path: '/'
        },
        {
          name: 'sbjs_first',
          description: 'First visit cookie',
          path: '/'
        },
        {
          name: 'tk_ai',
          description: 'Analytics cookie',
          path: '/'
        }
      ]
    }
  },

  /**
   * Depending on your servers capabilities, you may need to adjust the following settings.
   * It will affect the build time but also increase the reliability of the build process.
   * If you have a server with a lot of memory and CPU, you can remove the following settings.
   * @property {number} concurrency - How many pages to prerender at once
   * @property {number} interval - How long to wait between prerendering pages
   * @property {boolean} failOnError - This stops the build from failing but the page will not be statically generated
   */
  nitro: {
    prerender: {
      concurrency: 10,
      interval: 1000,
      failOnError: false,
    },
  },

  compatibilityDate: '2025-03-03',
});
