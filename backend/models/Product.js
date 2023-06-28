const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 2000,
  },
  imageUrl: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  price: {
    type: Number,
    required: true,
    min: 10,
    max: 999999,
  },
});

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(50).trim(),
    description: Joi.string().required().min(20).max(2000).trim(),
    imageUrl: Joi.string().required().max(2000).trim(),
    price: Joi.number().required().min(10).max(999999),
  });

  return schema.validate(product);
}

const Product = mongoose.model("Product", productSchema);

module.exports.Product = Product;
module.exports.validate = validateProduct;
