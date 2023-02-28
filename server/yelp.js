import fetch from 'node-fetch';

// In a real application, I would never commit an API key directly to the codebase.
// (I would instead use git-secret or a token/secrets configuration common to deployment setups.)
// But, in this case, it's the easiest thing to do.
// That way, I don't have to grant access to each interviewer/reviewer who might run this locally.
const YELP_API_KEY = "lccMWPKR6cqq8gBhbIQen8ooMu4YHk8ky-45m-U_CCjDwWMphtat1jikJqO9Lb8KS_D9SMmwOscs7_9TG6u5aSv-D7Rqy2jIpO-gikvtqHtrVXPq3W4NX2y0bM72Y3Yx"
const YELP_MAX_RESULTS_PER_REQUEST = 50;

const fetchBurgerJoints = async ({ location, price, offset }) => {
  const yelpApiResponse = await fetch('https://api.yelp.com/v3/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
      'Authorization': `Bearer ${YELP_API_KEY}`,
    },
    body: `
    {
      search(
        categories:"burgers",
        location: "${location}",
        price: "${price}",
        sort_by: "rating",
        limit: ${YELP_MAX_RESULTS_PER_REQUEST},
        offset: ${offset},
      ) {
        total
        business {
          id
          name
          price
          url
        }
      }
    }`
  });
  const yelpData = await yelpApiResponse.json();
  if (!yelpData.data?.search) {
    throw new Error(yelpData.errors?.map(error => error.message).join(', '));
  }
  return yelpData.data.search;
};

const searchForBurgerJoints = async ({ location, price }) => {
  let total;
  let burgerJoints = [];
  let requestsMade = 0;
  // Keep requesting burger joints until we max out those available or receive the Burger 100
  do {
    const offset = YELP_MAX_RESULTS_PER_REQUEST * requestsMade++;
    const yelpData = await fetchBurgerJoints({ location, price, offset });
    total = yelpData.total;
    burgerJoints = burgerJoints.concat(yelpData.business);
  } while (total > burgerJoints.length && burgerJoints.length < 100);
  return { total, burgerJoints };
};

export default { searchForBurgerJoints };