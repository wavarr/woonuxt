import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
  if (process.client) {
    // Global error handler
    window.addEventListener('error', (event) => {
      console.error('🔴 Global error:', event.error);
      
      // Log additional context
      console.error('Error details:', {
        message: event.error?.message,
        stack: event.error?.stack,
        url: window.location.href,
        timestamp: new Date().toISOString()
      });
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      console.error('🔴 Unhandled Promise Rejection:', event.reason);
      
      // Log additional context
      console.error('Rejection details:', {
        message: event.reason?.message,
        stack: event.reason?.stack,
        url: window.location.href,
        timestamp: new Date().toISOString()
      });
    });
    
    // Network request error logging
    const originalFetch = window.fetch;
    window.fetch = async function(input, init) {
      const startTime = performance.now();
      try {
        const response = await originalFetch(input, init);
        const endTime = performance.now();
        
        // Only log non-200 responses
        if (!response.ok) {
          console.warn(`⚠️ Fetch request to ${typeof input === 'string' ? input : input.url} failed:`, {
            status: response.status,
            statusText: response.statusText,
            duration: `${(endTime - startTime).toFixed(2)}ms`
          });
        }
        
        return response;
      } catch (error) {
        const endTime = performance.now();
        console.error(`❌ Fetch request to ${typeof input === 'string' ? input : input.url} error:`, {
          error: error.message,
          duration: `${(endTime - startTime).toFixed(2)}ms`
        });
        throw error;
      }
    };
    
    console.log('🛡️ Global error handlers installed');
  }
}); 
