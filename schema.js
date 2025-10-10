

// schema for your server side validation using joi
// Imports Joi, a popular validation library for JavaScript.

const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required().min(10),
    description: Joi.string().allow(''),
    imageUrl: Joi.string().uri().required()
});

const reviewSchema = Joi.object({
    rating: Joi.number().min(0).max(5).required(),
    comment: Joi.string().allow('').required()
});

module.exports = { productSchema, reviewSchema };