const express = require("express");
const router = express.Router();
const ordersLogic = require("../logic/orders-logic");

// Add new order
router.post("/", async (req, res, next) => {
  const { userId } = req.user;
  const orderData = req.body;

  try {
    const completedCheckoutResponse = await ordersLogic.completeCheckout(
      userId,
      orderData
    );
    res.json(completedCheckoutResponse);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// Get how many orders in store
router.get("/count", async (req, res, next) => {
  try {
    const ordersCount = await ordersLogic.getOrdersInStoreCount();
    res.json(ordersCount);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// Get last order for user
router.get("/", async (req, res, next) => {
  const { userId } = req.user;
  try {
    const lastOrder = await ordersLogic.getLastOrder(userId);
    res.json(lastOrder);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// Get the dates where there are more than 3 orders
router.get("/busy", async (req, res, next) => {
  try {
    const busyDays = await ordersLogic.getBusyDays();
    res.json(busyDays);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// Get last order for user
router.get("/all", async (req, res, next) => {
  const { userId } = req.user;
  const page = req.query.page;

  try {
    const lastOrder = await ordersLogic.getAllUserOrders(userId, page);
    res.json(lastOrder);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

module.exports = router;
