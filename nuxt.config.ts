export default defineNuxtConfig({
  // Get all the pages, components, composables and plugins from the parent theme
  extends: ['./woonuxt_base/'],

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
      concurrency: 1,
      interval: 0,
      failOnError: false,
    },
  },

  runtimeConfig: {
    public: {
      GRAPHQL_URL: process.env.GQL_HOST,
      APOLLO_HTTP_OPTIONS: {
        method: "post"
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
        external: [],
        onwarn(warning, warn) {
          if (warning.code === 'EXTERNAL_PACKAGE' && warning.id && warning.id.includes('graphql')) {
            return;
          }
          warn(warning);
        },
      },
    },
    optimizeDeps: {
      include: ['graphql'],
    },
    // Fix issues with server-only imports in client bundle
    ssr: {
      noExternal: ['woonuxt-settings', 'graphql']
    },
    // Prevent bundling issues with @nuxt/kit in client
    resolve: {
      alias: {
        '@nuxt/kit': '@nuxt/kit/dist/index.mjs',
      }
    },
    plugins: [
      {
        name: 'fix-woonuxt-settings',
        enforce: 'pre',
        transform(code, id) {
          // Handle the woonuxt-settings module imports
          if (id.includes('woonuxt-settings') && code.includes('@nuxt/kit')) {
            return {
              code: code.replace(/from\s+['"]@nuxt\/kit['"]/g, "from '@nuxt/kit/dist/index.mjs'"),
              map: null
            };
          }
        }
      }
    ]
  },

  compatibilityDate: '2025-03-01'
});