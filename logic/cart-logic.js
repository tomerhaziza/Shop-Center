const cartDao = require("../dao/cart-dao");

// Create new cart for user
async function createNewCart(userId) {
    return await cartDao.createNewCart(userId);
}

// Get user's last cart items
async function getLastCartItems(userId) {
    let lastCartId = await cartDao.getLastCartId(userId);

    if (lastCartId) { // if user has last cart
        let cartItems = await cartDao.getLastCartItems(lastCartId);

        // Calc total price
        let totalPrice = 0;

        for (let item of cartItems) {
            totalPrice += item.totalPrice;
        }

        return {
            id: lastCartId,
            cartItems: cartItems,
            totalPrice: totalPrice
        };
    }
    // If user doesn't have a cart,
    await cartDao.createNewCart(userId); // Create a new cart for the user

    return getLastCartItems(userId);
}

// Empty shopping cart
async function emptyShoppingCart(userId) {
    let cartId = await cartDao.getLastCartId(userId);
    return await cartDao.emptyShoppingCart(cartId);
}

// Check if product already in cart
async function isProductInCart(productData) {
    let productAmount = await cartDao.isProductInCart(productData);
    if (productAmount > 0) {
        return productAmount;
    }
    else {
        return false;
    }
}

// Add product to cart
async function addProductToCart(productData) {
    // Check if product already in cart & get product amount
    let productAmount = await this.isProductInCart(productData);

    if (productAmount) { // If product already in cart, add to existing product amount
        productData.amount += productAmount;
        productData.totalPrice = productData.amount * productData.price;
        return await cartDao.updateProductAmountInCart(productData);
    }

    return await cartDao.addProductToCart(productData);
}

// Remove product from cart
async function removeProductFromCart(productId, cartId) {
    return await cartDao.removeProductFromCart(productId, cartId);
}

// Update product amount in cart
async function updateProductAmountInCart(productData) {
    if (productData.amount == 0) {
        return await this.removeProductFromCart(productData.productId, productData.cartId)
    }
    return await cartDao.updateProductAmountInCart(productData);
}


module.exports = {
    createNewCart,
    getLastCartItems,
    emptyShoppingCart,
    isProductInCart,
    addProductToCart,
    removeProductFromCart,
    updateProductAmountInCart
}