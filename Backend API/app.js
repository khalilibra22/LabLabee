require('dotenv').config();
const express = require('express');
const labRouter = require('./api/lab_router');

const app = express();
app.use(express.json());


app.use('/api/labs',labRouter);
          

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });