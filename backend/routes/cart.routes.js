const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

// Get last shopping cart (items)
router.get("/last", cartController.getLastCartItems);

// Empty cart
router.delete("/empty", cartController.emptyShoppingCart);

// Add product to cart
router.post("/add-product", cartController.addProductToCart);

// Update product amount in cart
router.put("/update-amount", cartController.updateProductAmountInCart);

// Remove product from cart
router.delete("/remove-product/:id", cartController.removeProductFromCart);

// Get last shopping cart (items)
router.get("/:id", cartController.getCartItemsById);

module.exports = router;
