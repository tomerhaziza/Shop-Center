const express = require("express"),
  router = express.Router(),
  usersRouter = require("./users.routes"),
  productsRouter = require("./products.routes"),
  categoriesRouter = require("./categories.routes"),
  cartRouter = require("./cart.routes"),
  ordersRouter = require("./orders.routes"),
  uploadRouter = require("./upload.routes");

router.use("/users", usersRouter);
router.use("/categories", categoriesRouter);
router.use("/products", productsRouter);
router.use("/cart", cartRouter);
router.use("/orders", ordersRouter);
router.use("/upload", uploadRouter);

module.exports = router;
