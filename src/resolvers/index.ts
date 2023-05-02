import { Resolvers } from '@graphql';
import mutations from './mutations';
import queries from './queries';
import subscriptions from './subscriptions';

const resolvers: Resolvers = {
  Query: {
    ...queries
  },
  Mutation: {
    ...mutations
  },
  Subscription: {
    ...subscriptions
  }
};

export default resolvers;
