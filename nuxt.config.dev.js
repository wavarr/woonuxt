// Import the base configuration
import baseConfig from './nuxt.config'

// Create a new configuration that extends the base configuration
export default {
  ...baseConfig,
  // Override the graphql-client configuration
  'graphql-client': {
    ...baseConfig['graphql-client'],
    codegen: false, // Disable GraphQL code generation
    skipSchemaValidation: true, // Skip schema validation
  }
} 
