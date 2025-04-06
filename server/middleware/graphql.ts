// This middleware proxies GraphQL requests to the configured GQL_HOST.
// It no longer contains mock API logic.
export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);

  // Only handle requests aimed at the GraphQL API endpoint
  if (url.pathname.startsWith('/api/graphql')) {
    const target = process.env.GQL_HOST; // Ensure GQL_HOST is set in your .env file

    if (!target) {
      console.error('GQL_HOST environment variable is not set.');
      setResponseStatus(event, 500);
      return { error: 'GraphQL endpoint is not configured.' };
    }

    let body;
    try {
      // Only try to read body for relevant methods (POST)
      if (event.method === 'POST') {
        body = await readBody(event);
        // Optional: Log the query for debugging (consider limiting length)
        // console.log('GraphQL proxy request query:', body?.query?.substring(0, 100) + '...');
      }
    } catch (error: any) {
      console.error('Failed to read request body:', error.message);
      body = {}; // Use empty body if reading fails
    }

    try {
      // console.log(`Forwarding GraphQL request to: ${target}`);
      const response = await $fetch.raw(target, {
        method: event.method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // Forward necessary headers from the original request, e.g., Authorization, Session
          'Authorization': getHeader(event, 'Authorization') || '',
          'woocommerce-session': getHeader(event, 'woocommerce-session') || '',
          // Add origin header if required by the target server CORS policy
          // 'Origin': url.origin // Or a specific allowed origin
        },
        body: body,
        ignoreResponseError: true, // Handle errors manually based on status code
      });

      // Forward status code and headers from the target response
      setResponseStatus(event, response.status, response.statusText);
      response.headers.forEach((value, key) => {
         // Avoid forwarding disallowed headers like content-encoding if issues arise
        if (key.toLowerCase() !== 'content-encoding') {
           setHeader(event, key, value);
        }
      });

      return response._data;

    } catch (error: any) {
      console.error('GraphQL proxy fetch error:', error.message);
      // Handle network errors or cases where ignoreResponseError doesn't catch everything
       setResponseStatus(event, 500);
       return { data: null, errors: [{ message: `Failed to connect to GraphQL server: ${error.message || 'Unknown network error'}` }] };
    }
  }
  // If the request is not for /api/graphql, let Nuxt handle it
});