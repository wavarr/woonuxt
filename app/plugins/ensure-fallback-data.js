/**
 * Ensure Fallback Data Plugin
 * This plugin ensures that fallback data is properly loaded on application startup
 * when the GraphQL API is unavailable.
 */

import fallbackData from '../constants/fallbackData';

export default defineNuxtPlugin((nuxtApp) => {
  // Get the runtime config
  const config = useRuntimeConfig();
  const useLocalData = config.public.useLocalData || false;
  
  // Inject fallback data into the Nuxt app
  nuxtApp.provide('fallbackData', fallbackData);
  
  // Inject fallback data into window.__NUXT__ for SSR hydration
  if (process.client && useLocalData) {
    console.log('Injecting fallback data into window.__NUXT__');
    
    // Ensure window.__NUXT__ exists
    if (!window.__NUXT__) {
      window.__NUXT__ = {};
    }
    
    // Ensure window.__NUXT__.data exists
    if (!window.__NUXT__.data) {
      window.__NUXT__.data = {};
    }
    
    // Inject products
    window.__NUXT__.data.products = {
      nodes: fallbackData.products
    };
    
    // Inject categories
    window.__NUXT__.data.categories = {
      nodes: fallbackData.categories
    };
    
    // Inject payment gateways
    window.__NUXT__.data.paymentGateways = {
      nodes: fallbackData.paymentGateways
    };
    
    // Inject shipping methods
    window.__NUXT__.data.shippingMethods = fallbackData.shippingMethods;
    
    console.log('Fallback data injected successfully');
  }
  
  // On app:created, ensure products are loaded
  nuxtApp.hook('app:created', () => {
    if (useLocalData && process.client) {
      console.log('Ensuring products are loaded from fallback data');
      
      // If we have a useProducts composable, load fallback data
      if (typeof useProducts === 'function') {
        try {
          const { useFallbackData } = useProducts();
          // Use setTimeout to ensure this runs after the app is mounted
          setTimeout(() => {
            useFallbackData();
            console.log('Fallback products loaded successfully');
          }, 100);
        } catch (e) {
          console.error('Error loading fallback products:', e);
        }
      }
    }
  });
}); 
