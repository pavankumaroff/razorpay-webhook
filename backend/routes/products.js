const express = require("express");
const router = express.Router();
const validateId = require("../middleware/validateId");
const productController = require("../controllers/productController");

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router
  .route("/:id")
  .get(validateId, productController.getProduct)
  .put(validateId, productController.updateProduct)
  .delete(validateId, productController.deleteProduct);

module.exports = router;
