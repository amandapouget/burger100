import SearchController from '../controllers/SearchController.js';

const getParams = ({ body }) => ({
  location: body.location || 'All',
  price: body.price || '1,2,3,4',
  searchId: body.searchId,
  burgerJointId: body.burgerJointId,
});

const post = async (req, res, next) => {
  try {
    const { location, price } = getParams(req);
    const search = await SearchController.findOrCreateSearch({ location, price });
    res.json(search);
  } catch(error) {
    next(error);
  }
};

const put = async (req, res, next) => {
  try {
    const { location, price, searchId } = getParams(req);
    const search = await SearchController.refreshSearch({ location, price, searchId });
    res.json(search);
  } catch (error) {
    next(error);
  }
};

const patch = async (req, res, next) => {
  try {
    const { searchId, burgerJointId } = getParams(req);
    // In real life, I would cover this kind of request validation
    // with a common pattern or tool. For example, Joi.
    if (!searchId) res.status(400).send('Missing searchId');
    if (!burgerJointId) res.status(400).send('Missing burgerJointId');
    const search = await SearchController.deleteBurgerJointFromSearch({ searchId, burgerJointId });
    res.json(search);
  } catch(error) {
    next(error);
  }
};

export default { post, put, patch };