const productsDao = require("../models/products-dao");

// Add new product
exports.addProduct = async (req, res, next) => {
  const product = req.body;
  try {
    const response = await productsDao.addProduct(product);
    res.json(response);
  } catch (e) {
    return next(e);
  }
};

// Edit product
exports.editProduct = async (req, res, next) => {
  const product = req.body;
  try {
    const response = await productsDao.editProduct(product);
    res.json(response);
  } catch (e) {
    return next(e);
  }
};

// Search product by name
exports.searchProductsByName = async (req, res, next) => {
  const query = req.query.q;
  try {
    const response = await productsDao.searchProductsByName(query);
    res.json(response);
  } catch (e) {
    return next(e);
  }
};

// Get how many products in store
exports.getProductsInStoreCount = async (req, res, next) => {
  try {
    const count = await productsDao.getProductsInStoreCount();
    const response = count[0].productsCount;
    res.json(response);
  } catch (e) {
    return next(e);
  }
};

// Get the most popular products
exports.getBestSellerProducts = async (req, res, next) => {
  try {
    const response = await productsDao.getBestSellerProducts();
    res.json(response);
  } catch (e) {
    return next(e);
  }
};

exports.getAllProductsByCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  try {
    const response = await productsDao.getAllProductsByCategory(categoryId);
    res.json(response);
  } catch (e) {
    return next(e);
  }
};
