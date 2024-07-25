const Joi = require('joi');

const categorySchema = Joi.object({
    usertype: Joi.object({
        usertype: Joi.string().valid('Women', 'Men', 'Kids').required()
    }).required(),
    category: Joi.string().valid('Tops', 'Tshirts', 'Dress', 'Tops & Shirts', 'Jeans', 'Saree').required()
});

const productSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required(),
    price: Joi.string().pattern(/^Rs\. \d+$/).required(),
    brand: Joi.string().required(),
    category: categorySchema.required()
});

const productsArraySchema = Joi.array().items(productSchema);

module.exports = {
    productsArraySchema
}