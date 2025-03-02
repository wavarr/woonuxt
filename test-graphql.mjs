// Simple script to test the GraphQL endpoint
import fetch from 'node-fetch';

const GQL_HOST = process.env.GQL_HOST || 'https://modaprimeusa.com/graphql';
const APP_HOST = process.env.APP_HOST || 'https://store.modaprimeusa.com';

async function testGraphQLEndpoint() {
  console.log(`Testing GraphQL endpoint: ${GQL_HOST}`);
  
  try {
    // Simple introspection query to test the endpoint
    const query = `
      query {
        __schema {
          queryType {
            name
          }
        }
      }
    `;
    
    const response = await fetch(GQL_HOST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': APP_HOST,
        'Referer': APP_HOST,
        'X-WP-Guest-Access': 'true'
      },
      body: JSON.stringify({ query })
    });
    
    const status = response.status;
    console.log(`Response status: ${status}`);
    
    const contentType = response.headers.get('content-type');
    console.log(`Content-Type: ${contentType}`);
    
    if (status !== 200) {
      const text = await response.text();
      console.error('Error response:', text);
      return;
    }
    
    const data = await response.json();
    console.log('Response data:', JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('Error testing GraphQL endpoint:', error.message);
  }
}

testGraphQLEndpoint(); 
