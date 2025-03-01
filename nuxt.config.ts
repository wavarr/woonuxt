export default defineNuxtConfig({

  // Get all the pages, components, composables and plugins from the parent theme
  extends: ['./woonuxt_base'],

  components: [{ path: './components', pathPrefix: false }],

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

  runtimeConfig: {
    public: {
      GRAPHQL_URL: process.env.GRAPHQL_URL,
      APOLLO_HTTP_OPTIONS: {
        credentials: 'include'
      }
    }
  },
  
  build: {
    transpile: [
      '@apollo/client',
      '@vue/apollo-composable',
      'ts-invariant/process',
      'woonuxt-settings',
      'graphql'
    ]
  },

  // Fix server-only imports in client bundle
  vite: {
    build: {
      rollupOptions: {
        external: ['@nuxt/kit'],
        // Prevent graphql from being included in manualChunks and treated as external
        onwarn(warning, warn) {
          if (warning.code === 'EXTERNAL_PACKAGE' && warning.id && warning.id.includes('graphql')) {
            return;
          }
          warn(warning);
        }
      }
    },
    ssr: {
      noExternal: ['woonuxt-settings', 'graphql']
    },
    optimizeDeps: {
      include: ['graphql'],
      exclude: []
    },
    // Ensure graphql is properly handled
    resolve: {
      dedupe: ['graphql']
    }
  }
});
