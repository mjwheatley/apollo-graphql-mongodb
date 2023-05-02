import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { ExpressContextFunctionArgument, expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import { createServer } from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import bodyParser from 'body-parser';
import cors from 'cors';
import { readFileSync } from 'fs';
import path from 'path';
import * as url from 'url';
import mongoose from 'mongoose';
import resolvers from './resolvers';
import { Movie as MovieModel } from './models/movie';
import MoviesDataSource from './dataSources/movies';

export interface ContextValue {
  dataSources: {
    movies: MoviesDataSource;
  };
}

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const {
  PORT = 4000,
  MONGODB_URI = ``
} = process.env;

const connectToDb = async () => {
  await mongoose.connect(MONGODB_URI);
};

await connectToDb();
console.log('🎉 Connected to database successfully');

const dataSources = {
  // @ts-ignore
  movies: new MoviesDataSource(MovieModel)
};

// const getDynamicContext = async (ctx, msg, args) => {
//   // ctx is the graphql-ws Context where connectionParams live
//   if (ctx.connectionParams.authentication) {
//     const currentUser = await findUser(ctx.connectionParams.authentication);
//     return { currentUser };
//   }
//   // Otherwise let our resolvers know we don't have a current user
//   return { currentUser: null };
// };

// Schema definition
const typeDefs = readFileSync(path.join(__dirname, './schema.graphql'), { encoding: 'utf-8' });

// Create schema, which will be used separately by ApolloServer and
// the WebSocket server.
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Create an Express app and HTTP server; we will attach the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express();
const httpServer = createServer(app);

// Set up WebSocket server.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql'
});
const serverCleanup = useServer({
  schema
}, wsServer);

// Set up ApolloServer.
const server = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          }
        };
      }
    }
  ]
});

await server.start();
app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  expressMiddleware(server, {
    // Adding a context property lets you add data to your GraphQL operation contextValue
    // @ts-ignore
    context: async (_ctx: ExpressContextFunctionArgument, _msg: any, _args: any) => {
      // You can define your own function for setting a dynamic context
      // or provide a static value
      // return getDynamicContext(ctx, msg, args);
      return {
        dataSources
      };
    }
  }));

// Now that our HTTP server is fully set up, actually listen.
httpServer.listen(PORT, () => {
  console.log(`🚀 Query endpoint ready at http://localhost:${PORT}/graphql`);
  console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql`);
});
