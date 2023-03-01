const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const fetch = require('node-fetch');
const searchService = require('./search.js');
const { Search } = require('../models/Search.js');

// Avoiding hitting external services in tests.
jest.mock('node-fetch', () => jest.fn());

// These sample overall behavior integration tests describe
// the happy path functionality of the app.
// In a real system, I would also include unit tests on
// the controller and the model and cover the edge cases.
describe('with a test database', () => {
  let mongod;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri, {});
  });

  beforeEach(async () => {
    await Search.deleteMany().exec();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
  });

  describe('Search Service', () => {
    let response;
    let next;
    let location;
    let price;
    let total;
    let mockBurgerJoint;
  
    beforeEach(() => {
      response = { json: jest.fn() };
      next = jest.fn();
      location = '27608';
      price = '1,2';
      total = 1;
      mockBurgerJoint = {
        id: '123',
        name: 'Foo Burgers',
        price: '1',
        url: 'foobar.com'
      };
      fetch.mockImplementation(() => ({
        json: () => ({
          data: {
            search: {
              total: 1,
              business: [mockBurgerJoint]
            }
          },
        }),
      }));
    });
  
    test('#post creates a new Search', async () => {
      const request = { body: { location, price } };

      await searchService.post(request, response, next);

      expect(response.json).toHaveBeenCalledWith(
        expect.objectContaining({
          _id: expect.anything(),
          location, 
          price,
          total,
          burgerJoints: [expect.objectContaining(mockBurgerJoint)],
        })
      );
    });
    
    test('#post finds an existing Search', async () => {
      const search = new Search({ location, price, total, burgerJoints: [mockBurgerJoint] });
      await search.save();
      const request = { body: { location, price } };

      await searchService.post(request, response, next);

      expect(response.json).toHaveBeenCalledWith(
        expect.objectContaining({
          _id: search._id,
          location, 
          price,
          total,
          burgerJoints: [expect.objectContaining(mockBurgerJoint)],
        })
      );
    });
    
    test('#put replaces an existing Search', async () => {
      const oldSearch = new Search({ location, price, total, burgerJoints: [mockBurgerJoint] });
      await oldSearch.save();
      const request = { body: { location, price, searchId: oldSearch._id } };

      await searchService.put(request, response, next);

      const newSearch = response.json.mock.calls[0][0];
      // Makes a new Search
      expect(newSearch).toEqual(expect.objectContaining({
        _id: expect.anything(),
        location, 
        price,
        total,
        burgerJoints: [expect.objectContaining(mockBurgerJoint)],
      }));
      expect(newSearch._id).not.toEqual(oldSearch._id);
      // Deletes the old Search
      expect(await Search.findById(oldSearch._id)).toBeNull();
    });
    
    test('#patch modifies an existing Search by removing a burgerJoint', async () => {
      const search = new Search({ location, price, total, burgerJoints: [mockBurgerJoint] });
      await search.save();
      const request = { body: { searchId: search._id, burgerJointId: mockBurgerJoint.id } };

      await searchService.patch(request, response, next);

      expect(response.json).toHaveBeenCalledWith( expect.objectContaining({
        _id: expect.anything(),
        location, 
        price,
        total,
        burgerJoints: [],
      }));
    });
  });
});

