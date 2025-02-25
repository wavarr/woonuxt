/// <reference types="@nuxt/schema" />
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
  export { useAsyncQuery } from 'nuxt-graphql-client'
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $graphql: any
  }
} 
