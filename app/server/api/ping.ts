export default defineEventHandler((event) => {
  // Set headers to prevent caching
  setResponseHeaders(event, {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });
  
  // Return timestamp for latency calculation
  return {
    timestamp: Date.now(),
    server: 'nuxt',
    env: process.env.NODE_ENV
  };
}); 
