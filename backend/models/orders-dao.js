const connection = require("./connection-wrapper");
const ServerError = require('../errors/server-error');
const ErrorType = require('../errors/error-type');

// Add order to DB
async function completeCheckout(userId, orderData) {
    const sql = `INSERT INTO orders
                 (user_id, cart_id, total_price, city, street, delivery_date, order_date, credit_card, cart_items_qty)
                  values(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const parameters = [ userId, orderData.cartId, orderData.totalPrice, orderData.city,
                         orderData.street, new Date(orderData.deliveryDate), new Date(),
                         orderData.creditCardNumber, orderData.cartItemsQty];
    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

// Get how many orders in store
async function getOrdersInStoreCount() {
    const sql = "SELECT COUNT(*) as ordersCount FROM orders";
    try {
        return await connection.execute(sql);
    }
    catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

// Get last order for user
async function getLastOrder(userId) {
    const sql = `SELECT
                id, cart_id as cartId, total_price as totalPrice, city, street,
                delivery_date as deliveryDate, order_date as orderDate,
                credit_card as creditCardNumber, cart_items_qty as cartItemsQty

                FROM shopping_online.orders
                WHERE user_id = ?
                ORDER BY orderDate DESC limit 1`;
                const parameters = [userId];
    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

// Get the dates where there are more than 3 orders
async function getBusyDays() {
    const sql = ` SELECT delivery_date AS deliveryDate FROM orders 
                WHERE delivery_date >= ? GROUP BY deliveryDate HAVING COUNT(*)>=3 ORDER BY deliveryDate`;
                const parameters = [new Date()];
    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

// Get all orders for user
async function getAllUserOrders(userId, page) {
    const sql = ` SELECT
                id, cart_id as cartId, total_price as totalPrice, city, street,
                delivery_date as deliveryDate, order_date as orderDate,
                credit_card as creditCardNumber, cart_items_qty as cartItemsQty
                FROM orders
                WHERE user_id = ?
                ORDER BY id DESC
                LIMIT ?, 11 `;
                const parameters = [userId, page];
    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

module.exports = {
    completeCheckout,
    getOrdersInStoreCount,
    getLastOrder,
    getBusyDays,
    getAllUserOrders
}