import mongoose, { Schema } from 'mongoose';

export const Movie = mongoose.model('Movie', new Schema({
  title: String,
  rating: Number,
  year: Number
}));
