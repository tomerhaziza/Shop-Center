const ordersDao = require('../dao/orders-dao');
const cartDao = require('../dao/cart-dao');
const ServerError = require('../errors/server-error');
const ErrorType = require('../errors/error-type');

// Add new order
async function completeCheckout(userId, orderData) {
    try{
        let completedCheckout = await ordersDao.completeCheckout(userId, orderData);
        await cartDao.createNewCart(userId);
        return completedCheckout;
    } catch(e){
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

// Get how many orders in store
async function getOrdersInStoreCount(){
    let count = await ordersDao.getOrdersInStoreCount();
    return count[0].ordersCount;
}

// Get last order for user
async function getLastOrder(userId){
    let lastOrder = await ordersDao.getLastOrder(userId);
    return lastOrder[0];
}

// Get the dates where there are more than 3 orders
async function getBusyDays(){
    return await ordersDao.getBusyDays();
}

module.exports = {
    completeCheckout,
    getOrdersInStoreCount,
    getLastOrder,
    getBusyDays
}