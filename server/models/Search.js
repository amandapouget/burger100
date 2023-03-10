const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

// One could expand here by adding database validations, etc.
// Another architectural decision would be how fat to make the model vs. the controller
const searchSchema = new mongoose.Schema({
  location: String,
  price: String,
  total: Number,
  burgerJoints: [Object],
});

const Search = mongoose.model('Search', searchSchema);

module.exports = { Search };

