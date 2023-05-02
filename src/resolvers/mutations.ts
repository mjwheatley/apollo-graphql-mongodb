import { MutationResolvers } from '@graphql';
import IncrementingNumberResolvers from './IncrementingNumber';
import MovieResolvers from './Movies';

// Use the generated `MutationResolvers` type
// to type check our mutations!
const mutations: MutationResolvers = {
  ...IncrementingNumberResolvers.Mutation,
  ...MovieResolvers.Mutation
};

export default mutations;
