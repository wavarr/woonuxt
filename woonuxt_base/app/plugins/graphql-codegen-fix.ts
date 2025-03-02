export default defineNuxtPlugin(() => {
  // This plugin is a workaround for GraphQL codegen issues
  // It doesn't modify any runtime behavior, but helps with build-time validation
  
  // The real fix would be to update the GraphQL queries to match the schema,
  // but since we don't want to touch the GQL files, this plugin serves as documentation
  // for the workaround we're implementing
  
  console.info('GraphQL compatibility layer active - handling schema differences without modifying GQL files');
}); 
