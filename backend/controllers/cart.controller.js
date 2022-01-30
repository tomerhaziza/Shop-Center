const cartDao = require("../models/cart-dao");

// Get user's last cart items
exports.getLastCartItems = async (req, res, next) => {
  const { userId } = req.user;
  try {
    const lastCartId = await cartDao.getLastCartId(userId); // check if user has an opened cart
    if (lastCartId) {
      // if user has an opened cart
      const cartItems = await cartDao.getCartItemsById(userId, lastCartId);

      // Calc total price
      let totalPrice = 0;

      for (let item of cartItems) {
        totalPrice += item.totalPrice;
      }

      const response = {
        id: lastCartId,
        cartItems,
        totalPrice,
      };
      return res.json(response); // END HERE
    }

    // If user doesn't have a cart, create a new cart for the user (first login)
    await cartDao.createNewCart(userId);
    getLastCartItems(userId);
    // Need to check if this works!
    // const response = getLastCartItems(userId);
    // res.json(response);
  } catch (e) {
    return next(e);
  }
};

exports.emptyShoppingCart = async (req, res, next) => {
  const { userId } = req.user;
  try {
    const cartId = await cartDao.getLastCartId(userId);
    const response = await cartDao.emptyShoppingCart(cartId);
    res.json(response);
  } catch (e) {
    return next(e);
  }
};

// Add product to cart
exports.addProductToCart = async (req, res, next) => {
  const productData = req.body;
  try {
    // Check if product already in cart & get product amount
    const productAmount = await cartDao.isProductInCart(productData);
    if (productAmount > 0) {
      // If product already in cart, add to existing product amount
      productData.amount += productAmount;
      productData.totalPrice = productData.amount * productData.price;
      const updatedCartResponse =
        cartDao.updateProductAmountInCart(productData);

      return res.json(updatedCartResponse);
    }

    const response = await cartDao.addProductToCart(productData);
    res.json(response);
  } catch (e) {
    return next(e);
  }
};

// Update product amount in cart
exports.updateProductAmountInCart = async (req, res, next) => {
  const productData = req.body;
  try {
    if (productData.amount == 0) {
      const removeResponse = await this.removeProductFromCart(
        productData.productId,
        productData.cartId
      );
      return res.json(removeResponse); // Removed, end here
    }

    const response = await cartDao.updateProductAmountInCart(productData);
    res.json(response);
  } catch (e) {
    return next(e);
  }
};

// Remove product from cart
exports.removeProductFromCart = async (req, res, next) => {
  const { userId } = req.user;
  const cartId = await cartDao.getLastCartId(userId);
  const productId = req.params.id;
  try {
    const response = await cartDao.removeProductFromCart(productId, cartId);
    res.json(response);
  } catch (e) {
    return next(e);
  }
};

exports.getCartItemsById = async (req, res, next) => {
  const { userId } = req.user;
  const cartId = req.params.id;
  try {
    const cartItems = await cartDao.getCartItemsById(userId, cartId);

    // Calc total price
    let totalPrice = 0;

    for (let item of cartItems) {
      totalPrice += item.totalPrice;
    }

    const response = {
      id: cartId,
      cartItems,
      totalPrice,
    };
    res.json(response);
  } catch (e) {
    return next(e);
  }
};
