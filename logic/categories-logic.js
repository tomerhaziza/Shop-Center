const categoriesDao = require("../dao/categories-dao");

// Get all categories
async function getAllCategories() {
    return await categoriesDao.getAllCategories();
}


module.exports = {
    getAllCategories
}