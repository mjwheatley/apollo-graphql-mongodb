import { QueryResolvers } from '@graphql';
import IncrementingNumberResolvers from './IncrementingNumber';
import MovieResolvers from './Movies';

// Use the generated `QueryResolvers`
// type to type check our queries!
const queries: QueryResolvers = {
  ...IncrementingNumberResolvers.Query,
  ...MovieResolvers.Query
};

export default queries;
