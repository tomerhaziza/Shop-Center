const ordersDao = require("../models/orders-dao");
const cartDao = require("../models/cart-dao");

// Add new order
exports.completeCheckout = async (req, res, next) => {
  const { userId } = req.user;
  const orderData = req.body;
  try {
    const completedCheckout = await ordersDao.completeCheckout(
      userId,
      orderData
    );
    await cartDao.createNewCart(userId);
    res.json(completedCheckout);
  } catch (e) {
    return next(e);
  }
};

// Get how many orders in store
exports.getOrdersInStoreCount = async (req, res, next) => {
  try {
    const count = await ordersDao.getOrdersInStoreCount();
    const { ordersCount } = count[0];
    res.json(ordersCount);
  } catch (e) {
    return next(e);
  }
};

// Get last order for user
exports.getLastOrder = async (req, res, next) => {
  const { userId } = req.user;
  try {
    const lastOrder = await ordersDao.getLastOrder(userId);
    res.json(lastOrder[0]);
  } catch (e) {
    return next(e);
  }
};

// Get the dates where there are more than 3 orders
exports.getBusyDays = async (req, res, next) => {
  try {
    const response = await ordersDao.getBusyDays();
    res.json(response);
  } catch (e) {
    return next(e);
  }
};

// Get all user orders
exports.getAllUserOrders = async (req, res, next) => {
  const { userId } = req.user;
  const { page } = req.query;
  let wantedPage;
  try {
    if (page > 1) {
      wantedPage = page * 10 - 10;
    } else {
      wantedPage = 0;
    }

    const allOrders = await ordersDao.getAllUserOrders(userId, wantedPage);
    res.json(allOrders);
  } catch (e) {
    return next(e);
  }
};
