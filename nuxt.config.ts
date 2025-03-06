// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({

  // Get all the pages, components, composables and plugins from the parent theme
  extends: ['./woonuxt_base'],

  components: [{ path: './components', pathPrefix: false }],

  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss'
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
      siteDescription: 'Premium MD Service',
      siteShortDescription: 'Boutique Modafinil Vendor with fast shipping, us to us',
      siteImage: '/images/placeholder.jpg',
      frontendUrl: process.env.FRONTEND_URL || 'https://modaprimeusa.com'
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
  
});
