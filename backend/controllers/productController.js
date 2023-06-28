const { Product, validate } = require("../models/Product");

async function getAllProducts(req, res) {
  try {
    const products = await Product.find();

    res.json({ status: true, data: products });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
}

async function getProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    // prettier-ignore
    if (!product) return res.status(404).json({ status: false, message: "Product not found" });

    res.json({ status: true, data: product });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
}

async function createProduct(req, res) {
  try {
    const { error } = validate(req.body);
    // prettier-ignore
    if(error) return res.status(400).json({ status: false, message: error.details[0].message });

    const product = new Product(req.body);
    await product.save();

    res.status(201).json({ status: true, data: product });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const { name, description, imageUrl, price } = req.body;
    const { error } = validate(req.body);
    //prettier-ignore
    if(error) return res.status(400).json({ status: false, message: error.details[0].message });

    //prettier-ignore
    const product = await Product.findByIdAndUpdate(req.params.id, { $set: { name, description, imageUrl, price }}, { new: true });

    // prettier-ignore
    if(!product) return res.status(404).json({ status: false, message: "Product not found" });

    res.json({ status: true, data: product });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    // prettier-ignore
    if(!product) return res.status(404).json({ status: false, message: "Product not found" });

    res.json({ status: true, data: product });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
}

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
