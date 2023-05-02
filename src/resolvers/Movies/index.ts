import { Movie, Resolvers } from '@graphql';

export const resolvers: Resolvers = {
  Query: {
    getMovies: async (_, _args, { dataSources: { movies } }) => {
      return await movies.getMovies();
    },
    getMovie: async (_, { id }, { dataSources: { movies } }) => {
      return await movies.getMovie(id) as Movie;
    }
  },
  Mutation: {
    createMovie: async (_, args, { dataSources: { movies } }) => {
      return await movies.createMovie(args)
    }
  },
  Subscription: {

  }
};

export default resolvers;
