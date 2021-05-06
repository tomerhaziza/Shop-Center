let connection = require("./connection-wrapper");
const ServerError = require('../errors/server-error');
const ErrorType = require('../errors/error-type');

// Create new cart
async function createNewCart(userId) {
    const sql = "INSERT INTO cart (user_id, created_at)  values(?, ?)";
    const parameters = [userId, new Date()];
    try {
        return await connection.executeWithParameters(sql, parameters);
    } catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

// Get last cart id
async function getLastCartId(userId) {
    let sql = "SELECT * FROM cart WHERE user_id=? order by id DESC limit 1";
    const parameters = [ userId ];

    try {
        let response =  await connection.executeWithParameters(sql, parameters);
        if (response[0]){ // If user has cart
            return response[0].id;
        }
        return false; // If cart not found
    } catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

// Get last cart
async function getLastCartItems(lastCartId) {
    let sql =  `SELECT product_id as id, name, price, amount, total_price as totalPrice, image_url as imageUrl
                FROM ((cart_items
                INNER JOIN cart ON cart_items.cart_id = cart.id)
                INNER JOIN products ON cart_items.product_id = products.id)
                WHERE cart_id = ?`;
    const parameters = [ lastCartId ];

    try {
        return await connection.executeWithParameters(sql, parameters);
    } catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

// Empty shopping cart
async function emptyShoppingCart(cartId) {
    const sql = "DELETE FROM cart_items WHERE cart_id = ?";
    const parameters = [cartId];
    try {
        return await connection.executeWithParameters(sql, parameters);
    } catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

// Check if product already in cart to add to amount
async function isProductInCart(productData) {
    let sql =  "SELECT amount FROM cart_items where cart_id = ? AND product_id = ?"
    const parameters = [ productData.cartId, productData.productId ];

    try {
        let res = await connection.executeWithParameters(sql, parameters);
        if (res[0]){
            return res[0].amount;
        }
    } catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

// Add product to cart
async function addProductToCart(productData) {
    const sql = "INSERT INTO cart_items (product_id, amount, total_price, cart_id)  values(?, ?, ?, ?)";
    const parameters = [productData.productId, productData.amount, productData.totalPrice, productData.cartId];
    try {
        return await connection.executeWithParameters(sql, parameters);
    } catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

// Update product amount in cart
async function updateProductAmountInCart(productData) {
    const sql = "UPDATE cart_items SET amount = ?, total_price = ? WHERE cart_id = ? and product_id = ?";
    const parameters = [productData.amount, productData.totalPrice, productData.cartId, productData.productId];
    try {
        return await connection.executeWithParameters(sql, parameters);
    } catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

// Remove product from cart
async function removeProductFromCart(productId, cartId) {
    const sql = "DELETE FROM cart_items WHERE cart_id = ? and product_id = ?";
    const parameters = [cartId, productId];
    try {
        return await connection.executeWithParameters(sql, parameters);
    } catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}


module.exports = {
    createNewCart,
    getLastCartId,
    getLastCartItems,
    emptyShoppingCart,
    isProductInCart,
    addProductToCart,
    updateProductAmountInCart,
    removeProductFromCart
}