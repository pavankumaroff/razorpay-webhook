const { Payment, validate } = require("../models/payment");
const { instance, validateWebhookSignature } = require("../config/razorpay");
const { Product } = require("../models/Product");
const crypto = require("crypto");

let product_id;

async function checkout(req, res) {
  try {
    const { error } = validate(req.body);
    //prettier-ignore
    if(error) return res.status(400).json({ status: false, message: error.details[0].message });

    const product = await Product.findById(req.body.productId);
    // prettier-ignore
    if(!product) return res.status(404).json({ status: false, message: "Product not found" });
    product_id = product._id;

    const options = {
      amount: product.price * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    const order = await instance.orders.create(options);
    res.json({ status: true, data: order });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  } finally {
    product_id = null;
  }
}

async function verify(req, res) {
  const webhookSignature = req.header("x-razorpay-signature");
  const webhookSecret = process.env.WEBHOOK_SECRET;
  const entity = req.body?.payload?.payment?.entity;
  const payment_id = entity?.id;
  const order_id = entity?.order_id;
  const amount = entity?.amount / 100;
  const currency = entity?.currency;
  const status = entity?.status;
  const method = entity?.method;

  try {
    const isValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      webhookSecret
    );

    if (isValid) {
      const payment = new Payment({
        order_id,
        payment_id,
        amount,
        currency,
        status,
        method,
        product_id,
      });
      await payment.save();

      return res.json({ status: true, message: "Payment successful" });
    }

    res.status(400).json({ status: false, message: "Invalid signature" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  } finally {
    product_id = null;
  }
}

module.exports = { checkout, verify };
