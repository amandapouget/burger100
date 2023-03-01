const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const search = require('./routeHandlers/search.js');

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
  // In a real system, I would not dump any error that arises to the user.
  // Instead, I would sanitize the error message and display a code
  // or other universal pattern so that the user can only see certain approved
  // messages. (Localization also a concern there.)
  app.use((error, req, res, next) => {
    console.log('Error processing request:', error.message); 
    res.header("Content-Type", 'application/json');
    res.status(error.status || 400).send(error.message);
  });
}