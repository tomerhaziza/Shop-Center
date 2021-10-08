const express = require('express');
const router = express.Router();
const productsLogic = require('../logic/products-logic');

// New product
router.post("/", async (req, res, next) => {
    const product = req.body;

    try {
        const successfullResponse = await productsLogic.addProduct(product);
        res.json(successfullResponse);
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});

// Edit product
router.put("/", async (req, res, next) => {
    const product = req.body;

    try {
        const successfullResponse = await productsLogic.editProduct(product);
        res.json(successfullResponse);
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});


// Search product by name
router.get("/search", async (req, res, next) => {
    const query = req.query.q;
    try {
        const searchedProducts = await productsLogic.searchProductsByName(query);
        res.json(searchedProducts);
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});

// Get how many products in store
router.get("/count", async (req, res, next) => {
    try {
        const productsCount = await productsLogic.getProductsInStoreCount();
        res.json(productsCount);
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});

// Get the most popular products
router.get("/popular", async (req, res, next) => {
    try {
        const bestSellers = await productsLogic.getBestSellerProducts();
        res.json(bestSellers);
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});

// Get all products by category
router.get("/:id", async (req, res, next) => {
    const categoryId = req.params.id;
    try {
        const allProducts = await productsLogic.getAllProductsByCategory(categoryId);
        res.json(allProducts);
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});


module.exports = router;