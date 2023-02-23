import path from 'path';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 8000;

app
  .use(cors())
  .use(express.text())
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ restaurants: `You requested restaurant data` });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
