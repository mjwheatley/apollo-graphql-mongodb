import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/schema.graphql',
  generates: {
    'src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-resolvers',
        'typescript-mongodb'
      ],
      config: {
        useIndexSignature: true,
        contextType: '../index#ContextValue'
      }
    },
    'src/generated/graphql.schema.json': {
      plugins: ['introspection']
    }
  }
};

export default config;
