import { MongoDataSource } from 'apollo-datasource-mongodb'
import { Movie, MutationCreateMovieArgs } from '@graphql';

export default class MoviesDataSource extends MongoDataSource<Movie> {
  async getMovies() {
    // @ts-ignore
    return await this.model.find();
  }

  async getMovie(id: string) {
    return await this.findOneById(id);
  }

  async createMovie({ title, rating, year }: MutationCreateMovieArgs) {
    // @ts-ignore
    return await this.model.create({ title, rating, year });
  }
}
