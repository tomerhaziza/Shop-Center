const express = require('express');
const router = express.Router();
const ordersLogic = require('../logic/orders-logic');

// Add new order
router.post("/", async (req, res, next) => {
    let userId = req.user.sub;
    let orderData = req.body;

    try {
        let completedCheckoutResponse = await ordersLogic.completeCheckout(userId, orderData);
        res.json(completedCheckoutResponse);
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
})

// Get how many orders in store
router.get("/count", async (req, res, next) => {
    try {
        let ordersCount = await ordersLogic.getOrdersInStoreCount();
        res.json(ordersCount);
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});

// Get last order for user
router.get("/", async (req, res, next) => {
    let userId = req.user.sub;
    try {
        let lastOrder = await ordersLogic.getLastOrder(userId);
        res.json(lastOrder);
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});

// Get the dates where there are more than 3 orders
router.get("/busy", async (req, res, next) => {
    try {
        let busyDays = await ordersLogic.getBusyDays();
        res.json(busyDays);
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});

// Get last order for user
router.get("/all", async (req, res, next) => {
    let userId = req.user.sub;
    let page = req.query.page;

    try {
        let lastOrder = await ordersLogic.getAllUserOrders(userId, page);
        res.json(lastOrder);
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});


module.exports = router;