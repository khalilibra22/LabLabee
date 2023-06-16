const mongoose = require('../config/database');
const labSchema = require('../models/lab_schema');

//create Lab mongoose model using labSchema
const Lab = mongoose.model('Lab', labSchema);
module.exports = Lab; 