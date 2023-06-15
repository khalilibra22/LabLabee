const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_STR)
  .then(() => console.log('Connected to db!')).catch((err) => console.error(err));

module.exports = mongoose;