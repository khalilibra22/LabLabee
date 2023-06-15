const mongoose = require('../config/database');

const labSchema = new mongoose.Schema({
    name: String,
    technology: String,
    start_date: Date, 
    end_date: Date
  },
  {versionKey: false});

module.exports = labSchema;