/// <reference types="@nuxt/types" />
/// <reference types="@nuxtjs/i18n" />
/// <reference types="nuxt-graphql-client" />

declare module '#app' {
  interface PageMeta {
    title?: string
  }
}

declare module '#imports' {
  export * from '@nuxt/schema'
  export * from 'vue'
  export * from '@vue/runtime-core'
} 
