import { Resolvers } from '@graphql';
import { getCurrentNumber, incrementNumber } from '../../data/incrementingNumber';
import { withFilter } from 'graphql-subscriptions';
import { ContextValue } from '../../index';

const resolvers: Resolvers = {
  Query: {
    currentNumber: (_root, _args, _context, _info) => {
      return getCurrentNumber();
    }
  },
  Mutation: {
    incrementNumber: (_root, _args, ctx, _info) => {
      const { pubsub } = ctx;
      const currentNumber = incrementNumber();
      pubsub.publish('NUMBER_INCREMENTED', { numberIncremented: currentNumber });
      return currentNumber;
    }
  },
  Subscription: {
    numberIncremented: {
      // @ts-ignore
      subscribe: withFilter(
        (_root: any, _args: any, ctx: ContextValue, _info: any) => {
          const { pubsub } = ctx;
          return pubsub.asyncIterator(['NUMBER_INCREMENTED']);
        },
        (payload: any, _variables: any) => {
          console.log(`Subscription.numberIncrement.subscribe payload`, payload );
          return !!payload;
        }
      )
    }
  }
};

export default resolvers;
