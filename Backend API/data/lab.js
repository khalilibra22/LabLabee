const mongoose = require('../config/database');

const labSchema = require('../models/lab_schema');
const Lab = mongoose.model('Lab', labSchema);
module.exports = Lab; 