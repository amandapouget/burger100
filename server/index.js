import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Search } from './models/Search.js';
import Yelp from './yelp.js';

const app = express();
const port = 8000;
const start = app.listen(port, console.log(`'Burger: 100' listening on port ${port}`));

main().then(start).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017');

  app
    .use(cors())
    .use(express.text())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))


  // Corresponds to "Search" button
  app.post('/search', async (req, res, next) => {
    try {
      const location = req.body.location || 'All';
      const price = req.body.price || '1,2,3,4';
      // Get cached/modified Search if it exists
      let search = await Search.findOne({ location, price }).exec();
      // Otherwise, get new data from yelp and cache it as a Search
      if (!search) {
        const { total, burgerJoints } = await Yelp.searchForBurgerJoints(location, price);
        search = new Search({ location, price, total, burgerJoints });
        await search.save();
      }
      // Return persisted Search (includes form data and results)
      res.json(search);
    } catch(error) {
      next(error);
    }
  });

  // Corresponds to "Refresh" button
  app.put('/search', async (req, res, next) => {
    try {
      const location = req.body.location || 'All';
      const price = req.body.price || '1,2,3,4';
      const searchId = req.body.searchId;
      // Delete any existing searches
      if (searchId) await Search.deleteOne({ _id: searchId }).exec();
      await Search.deleteMany({ location, price }).exec();
      // Create a new search with refreshed data from Yelp
      const { total, burgerJoints } = await Yelp.searchForBurgerJoints(location, price);
      const search = new Search({ location, price, total, burgerJoints });
      await search.save();
      res.json(search);
    } catch (error) {
      next(error);
    }
  });

  // Corresponds to "X" button by individual burger joints
  app.patch('/search', async (req, res, next) => {
    try {
      const { searchId, burgerJointId } = req.body;
      // In real life, I would cover this kind of request validation
      // with a common pattern or tool. For example, Joi.
      if (!searchId) res.status(400).send('Missing searchId');
      if (!burgerJointId) res.status(400).send('Missing burgerJointId');
      const search = await Search.findById(searchId).exec();
      // Remove the burger joint if it is still on the model
      search.burgerJoints = search.burgerJoints.filter(burgerJoint => burgerJoint.id !== burgerJointId);
      // Save the model
      await search.save();
      res.json(search);
    } catch(error) {
      next(error);
    }
  });

  // Universal route error handler
  app.use((error, req, res, next) => {
    console.log('Error processing request:', error.message); 
    res.header("Content-Type", 'application/json');
    res.status(error.status || 400).send(error.message);
  });
}