const express = require('express');
const apiController = express.Router();

const usersController = require('./users-controller');
const productsController = require('./products-controller');
const categoriesController = require('./categories-controller');
const cartController = require('./cart-controller');
const ordersController = require('./orders-controller');
const uploadController = require('./upload-controller');

apiController.use("/users", usersController);
apiController.use("/categories", categoriesController);
apiController.use("/products", productsController);
apiController.use("/cart", cartController);
apiController.use("/orders", ordersController);
apiController.use("/upload", uploadController);

module.exports = apiController