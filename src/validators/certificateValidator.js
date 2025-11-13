const Joi = require('joi');

const createCertificate = Joi.object({
    type: Joi.string().valid('power_of_attorney', 'last_will', 'rent_agreement', 'other').required(),
    title: Joi.string().min(3).max(200).required(),
    description: Joi.string().allow('', null),
    parties: Joi.array().items(
    Joi.object({
        name: Joi.string().required(),
        role: Joi.string().allow('', null),
        contact: Joi.string().allow('', null)
    })
    ),
    data: Joi.object().optional(),
    createdBy: Joi.string().optional()
});


module.exports = { createCertificate };