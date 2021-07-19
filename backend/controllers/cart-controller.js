const express = require('express');
const router = express.Router();
const cartLogic = require('../logic/cart-logic');
const cartDao = require('../dao/cart-dao')
const userDataService = require('../services/user-data-service');

// Get last shopping cart (items)
router.get("/last", async (req, res, next) => {
    let userId = userDataService.getUserId(req.headers.authorization);
    try {
        let lastShoppingCart = await cartLogic.getLastCartItems(userId);
        res.json(lastShoppingCart);
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

// Empty cart
router.delete("/empty", async (req, res, next) => {
    let userId = userDataService.getUserId(req.headers.authorization);
    try {
        let response = await cartLogic.emptyShoppingCart(userId);
        res.json(response);
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

// Add product to cart
router.post("/add-product", async (req, res, next) => {
    let productData = req.body;
    try {
        let successfullResponse = await cartLogic.addProductToCart(productData);
        res.json(successfullResponse);
    } catch (error) {
        console.log(error);
        return next(error);
    }
})

// Update product amount in cart
router.put("/update-amount", async (req, res, next) => {
    let productData = req.body;
    try {
        let successfullResponse = await cartLogic.updateProductAmountInCart(productData);
        res.json(successfullResponse);
    } catch (error) {
        console.log(error);
        return next(error);
    }
})

// Remove product from cart
router.delete("/remove-product/:id", async (req, res, next) => {
    let userId = userDataService.getUserId(req.headers.authorization);
    let cartId = await cartDao.getLastCartId(userId);
    let productId = req.params.id;

    try {
        let response = await cartLogic.removeProductFromCart(productId, cartId);
        res.json(response);
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

// Get last shopping cart (items)
router.get("/:id", async (req, res, next) => {
    let userId = userDataService.getUserId(req.headers.authorization);
    let cartId = req.params.id;
    try {
        let shoppingCart = await cartLogic.getCartItemsById(userId, cartId);
        res.json(shoppingCart);
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

module.exports = router;