const mongoose = require('../config/database');

//Lab mongoose schema 
const labSchema = new mongoose.Schema({
    name: String,
    technology: String,
    start_date: Date, 
    end_date: Date
  },
  {versionKey: false}); // hide version key field 

module.exports = labSchema;