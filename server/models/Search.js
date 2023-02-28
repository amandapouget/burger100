import mongoose from 'mongoose';
mongoose.set('strictQuery', true);

const searchSchema = new mongoose.Schema({
  location: String,
  price: String,
  total: Number,
  burgerJoints: [Object],
});

export const Search = mongoose.model('Search', searchSchema);

