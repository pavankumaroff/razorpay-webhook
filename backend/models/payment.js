const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const paymentSchema = new mongoose.Schema({
  order_id: String,
  payment_id: String,
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
