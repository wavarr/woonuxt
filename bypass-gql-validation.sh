chmod +x bypass-gql-validation.sh

# Create a temporary directory for the build
mkdir -p .nuxt/temp-gql-bypass

# Copy the GraphQL files to a temporary location
cp -r app/queries .nuxt/temp-gql-bypass/

# Start the development server with a modified environment
NUXT_GRAPHQL_CODEGEN=false npm run dev 
\
