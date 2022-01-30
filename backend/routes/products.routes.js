const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");

// New product
router.post("/", productsController.addProduct);

// Edit product
router.put("/", productsController.editProduct);

// Search product by name
router.get("/search", productsController.searchProductsByName);

// Get how many products in store
router.get("/count", productsController.getProductsInStoreCount);

// Get the most popular products
router.get("/popular", productsController.getBestSellerProducts);

// Get all products by category
router.get("/:id", productsController.getAllProductsByCategory);

module.exports = router;
