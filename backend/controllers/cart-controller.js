const express = require("express");
const router = express.Router();
const cartLogic = require("../logic/cart-logic");
const cartDao = require("../dao/cart-dao");

// Get last shopping cart (items)
router.get("/last", async (req, res, next) => {
  const { userId } = req.user;
  try {
    const lastShoppingCart = await cartLogic.getLastCartItems(userId);
    res.json(lastShoppingCart);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// Empty cart
router.delete("/empty", async (req, res, next) => {
  const { userId } = req.user;
  try {
    const response = await cartLogic.emptyShoppingCart(userId);
    res.json(response);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// Add product to cart
router.post("/add-product", async (req, res, next) => {
  const productData = req.body;

  try {
    const successfullResponse = await cartLogic.addProductToCart(productData);
    res.json(successfullResponse);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// Update product amount in cart
router.put("/update-amount", async (req, res, next) => {
  const productData = req.body;
  try {
    const successfullResponse = await cartLogic.updateProductAmountInCart(
      productData
    );
    res.json(successfullResponse);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// Remove product from cart
router.delete("/remove-product/:id", async (req, res, next) => {
  const { userId } = req.user;
  const cartId = await cartDao.getLastCartId(userId);
  const productId = req.params.id;

  try {
    const response = await cartLogic.removeProductFromCart(productId, cartId);
    res.json(response);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// Get last shopping cart (items)
router.get("/:id", async (req, res, next) => {
  const { userId } = req.user;
  const cartId = req.params.id;
  try {
    const shoppingCart = await cartLogic.getCartItemsById(userId, cartId);
    res.json(shoppingCart);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

module.exports = router;
