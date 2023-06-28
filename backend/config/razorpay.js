const Razorpay = require("razorpay");
// prettier-ignore
const { validateWebhookSignature } = require("razorpay/dist/utils/razorpay-utils");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = { instance, validateWebhookSignature };
