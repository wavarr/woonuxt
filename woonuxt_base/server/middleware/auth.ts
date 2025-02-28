import { defineEventHandler, parseCookies, setCookie } from 'h3';

export default defineEventHandler((event) => {
  // Add CORS headers
  setHeader(event, 'Access-Control-Allow-Credentials', 'true');
  setHeader(event, 'Access-Control-Allow-Origin', process.env.FRONT_END_URL || 'http://localhost:3000');
  
  // Handle OPTIONS request
  if (event.method === 'OPTIONS') {
    setHeader(event, 'Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return '';
  }
}); 
