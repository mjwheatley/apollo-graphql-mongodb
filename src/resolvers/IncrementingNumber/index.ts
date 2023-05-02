import { Resolvers } from '@graphql';
import { currentNumber, incrementNumber } from '../../data/incrementingNumber';
import { pubsub } from '../../lib/pubsub';

const resolvers: Resolvers = {
  Query: {
    currentNumber: (_root, _args, _context, _info) => {
      return currentNumber;
    }
  },
  Mutation: {
    incrementNumber: (_root, _args, _context, _info) => {
      incrementNumber();
      return currentNumber;
    }
  },
  Subscription: {
    numberIncremented: {
      subscribe: (_root, _args, _context, _info) => pubsub.asyncIterator(['NUMBER_INCREMENTED']) as unknown as AsyncIterable<any>
    }
  }
};

export default resolvers;
