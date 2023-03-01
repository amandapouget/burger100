const { Search } = require('../models/Search.js');
const Yelp = require('../yelp.js');

const findOrCreateSearch = async ({ location, price }) => {
  // Find any existing search
  let search = await Search.findOne({ location, price }).exec();
  // Else, create a new search by fetching Yelp data
  if (!search) {
    const { total, burgerJoints } = await Yelp.searchForBurgerJoints({ location, price });
    search = new Search({ location, price, total, burgerJoints });
    await search.save();
  }
  // Return the found or created search
  return search;
};

const refreshSearch = async ({ location, price, searchId }) => {
  // Delete any existing searches
  if (searchId) await Search.deleteOne({ _id: searchId }).exec();
  await Search.deleteMany({ location, price }).exec();
  // Create a new search with refreshed data from Yelp
  const { total, burgerJoints } = await Yelp.searchForBurgerJoints({ location, price });
  const search = new Search({ location, price, total, burgerJoints });
  await search.save();
  // Return the replacement search
  return search;
};

const deleteBurgerJointFromSearch = async ({ searchId, burgerJointId }) => {
  // Find the existing search
  const search = await Search.findById(searchId).exec();
  // Remove the burger joint if it is still on the model
  search.burgerJoints = search.burgerJoints.filter(burgerJoint => burgerJoint.id !== burgerJointId);
  // Save the model
  await search.save();
  // Return the modified search
  return search;
};

module.exports = {
  findOrCreateSearch,
  refreshSearch,
  deleteBurgerJointFromSearch
};