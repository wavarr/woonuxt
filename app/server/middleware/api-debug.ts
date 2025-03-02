export default defineEventHandler((event) => {
  // Only run in development
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  
  const start = Date.now();
  const url = getRequestURL(event);
  const method = event.node.req.method;
  
  // Log request
  console.log(`[API] ${method} ${url.pathname}${url.search}`);
  
  // Add response hook to log completion
  event.node.res.on('finish', () => {
    const duration = Date.now() - start;
    const status = event.node.res.statusCode;
    const statusText = event.node.res.statusMessage;
    
    // Color based on status
    let logMethod = console.log;
    if (status >= 400) {
      logMethod = console.error;
    } else if (status >= 300) {
      logMethod = console.warn;
    }
    
    logMethod(`[API] ${method} ${url.pathname} - ${status} ${statusText} (${duration}ms)`);
  });
}); 
