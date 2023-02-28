import fetch from 'node-fetch';

// In a real application, I would never commit an API key directly to the codebase.
// (I would instead use git-secret or a token/secrets configuration common to deployment setups.)
// But, in this case, it's the easiest thing to do.
// That way, I don't have to grant access to each interviewer/reviewer who might run this locally.

const YELP_API_KEY="lccMWPKR6cqq8gBhbIQen8ooMu4YHk8ky-45m-U_CCjDwWMphtat1jikJqO9Lb8KS_D9SMmwOscs7_9TG6u5aSv-D7Rqy2jIpO-gikvtqHtrVXPq3W4NX2y0bM72Y3Yx"

const fetchBurgerJoints = async (location, price) => {
  // set back to 50 after done devving (Yelp has monthly hit limit of 10k)
  const limit = 1; // Yelp API v3 max results per request
  // change to loop twice to collect all 100 results
  const offset = 0;
  const yelpApiResponse = await fetch('https://api.yelp.com/v3/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
      'Authorization': `Bearer ${YELP_API_KEY}`,
    },
    body: `
    {
      search(categories:"burgers", location: "${location}", price: "${price}", limit: ${limit}, offset: ${offset}) {
        total
        business {
          id
          name
          rating
          price
        }
      }
    }`
  });
  return await yelpApiResponse.json();
};

export default { fetchBurgerJoints };