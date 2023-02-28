// In large projects, the details of api calls are often abstracted away
// both organizationally and behind various tools with more complexity than fetch.
// (For example, react-query.)
// So putting these api calls in a separate file hints at that architecture.

const getPriceString = ({ selectedPrices }) => selectedPrices.map(option => option.value).join(',');
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};
const url = 'http://localhost:8000/search';
const unpackResponse = ({ res }) => res.ok ? res.json() : res.text().then(text => ({ error: text }));

export const getOrCreateSearch = async ({ location, selectedPrices }) => {
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ location, price: getPriceString({ selectedPrices }) })
  });
  return unpackResponse({ res });
};

export const replaceSearchWithRefreshedData = async ({ location, selectedPrices, searchId }) => {
  const res = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ location, price: getPriceString({ selectedPrices }), searchId })
  });
  return unpackResponse({ res });
};

export const deleteBurgerJointFromSearch = async ({ searchId, burgerJointId }) => {
  const res = await fetch(url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ searchId, burgerJointId })
  });
  return unpackResponse({ res });
};