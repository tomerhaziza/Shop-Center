const express = require('express'),
    apiController = express.Router(),
    usersController = require('./users-controller'),
    productsController = require('./products-controller'),
    categoriesController = require('./categories-controller'),
    cartController = require('./cart-controller'),
    ordersController = require('./orders-controller'),
    uploadController = require('./upload-controller');

apiController.use("/users", usersController);
apiController.use("/categories", categoriesController);
apiController.use("/products", productsController);
apiController.use("/cart", cartController);
apiController.use("/orders", ordersController);
apiController.use("/upload", uploadController);

module.exports = apiController;