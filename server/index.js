import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import { connectToDB } from './database.js';
import { YELP_API_KEY } from './apiKey.js';

const app = express();
const port = 8000;

app
  .use(cors())
  .use(express.text())
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  const variable = "garaje-san-francisco";
  fetch('https://api.yelp.com/v3/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
      'Authorization': `Bearer ${YELP_API_KEY}`,
    },
    body: `
    {
        business(id: "${variable}") {
            name
            id
            rating
            url
        }
    }`})
    .then(yelpApiResponse => yelpApiResponse.json())
    .then((data) => res.json(data));
});


// Startup
const start = async () => {
  try {
    // Make sure database is online before accepting requests
    await connectToDB();
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch(error) {
    console.error(error);
  }
}
start();