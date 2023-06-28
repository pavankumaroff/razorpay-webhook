const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const paymentSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
  },
  payment_id: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  product_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Product",
  },
});

function validateProductId(id) {
  const schema = Joi.object({
    productId: Joi.objectId(),
  });

  return schema.validate(id);
}

const Payment = mongoose.model("Payment", paymentSchema);

module.exports.Payment = Payment;
module.exports.validate = validateProductId;
