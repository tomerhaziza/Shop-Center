const connection = require("./connection-wrapper");
const ServerError = require('../errors/server-error');
const ErrorType = require('../errors/error-type');

// Add order to DB
async function completeCheckout(userId, orderData) {
    const sql = `INSERT INTO orders
                 (user_id, cart_id, total_price, city, street, delivery_date, order_date, credit_card)
                  values(?, ?, ?, ?, ?, ?, ?, ?)`;
    const parameters = [ userId, orderData.cartId, orderData.totalPrice, orderData.city,
                         orderData.street, new Date(orderData.deliveryDate), new Date(),
                         orderData.creditCardNumber];
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
    let sql = "SELECT COUNT(*) as ordersCount FROM orders";
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
    let sql = `SELECT
                id, cart_id as cartId, total_price as totalPrice, city, street,
                delivery_date as deliveryDate, order_date as orderDate, credit_card as creditCard
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
    let sql = ` SELECT delivery_date AS deliveryDate FROM orders 
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

module.exports = {
    completeCheckout,
    getOrdersInStoreCount,
    getLastOrder,
    getBusyDays
}