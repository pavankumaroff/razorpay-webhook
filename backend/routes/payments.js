const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.route("/checkout").post(paymentController.checkout);
router.route("/verify").post(paymentController.verify);

module.exports = router;
