const Joi = require('joi');

const labInfoValidation = Joi.object(
    {
        name : Joi.string().required().max(50),
        technology : Joi.string().required().max(50),
        start_date : Joi.date().required(),
        end_date : Joi.date().required()
    });

module.exports = labInfoValidation;