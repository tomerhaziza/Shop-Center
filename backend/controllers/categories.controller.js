const categoriesDao = require("../models/categories-dao");

// Get all categories
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoriesDao.getAllCategories();
    res.json(categories);
  } catch (e) {
    return next(e);
  }
};
