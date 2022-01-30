const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders.controller");

// Add new order
router.post("/", ordersController.completeCheckout);

// Get how many orders in store
router.get("/count", ordersController.getOrdersInStoreCount);

// Get last order for user
router.get("/", ordersController.getLastOrder);
// const { userId } = req.user;

// Get the dates where there are more than 3 orders
router.get("/busy", ordersController.getBusyDays);

// Get last order for user
router.get("/all", ordersController.getAllUserOrders);

module.exports = router;
