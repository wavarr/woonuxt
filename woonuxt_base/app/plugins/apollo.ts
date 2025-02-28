import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { provideApolloClient } from '@vue/apollo-composable';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const httpLink = createHttpLink({
    uri: config.public.GRAPHQL_URL,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const cache = new InMemoryCache();

  const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only'
      }
    }
  });

  nuxtApp.vueApp.provide('apollo', apolloClient);
  provideApolloClient(apolloClient);
}); 
