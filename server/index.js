import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import search from './routeHandlers/search.js';

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
  app.post('/search', search.post);

  // Corresponds to "Refresh" button
  app.put('/search', search.put);

  // Corresponds to "X" button by individual burger joints
  app.patch('/search', search.patch);

  // Universal route error handler
  app.use((error, req, res, next) => {
    console.log('Error processing request:', error.message); 
    res.header("Content-Type", 'application/json');
    res.status(error.status || 400).send(error.message);
  });
}