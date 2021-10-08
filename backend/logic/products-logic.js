const productsDao = require("../dao/products-dao");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

// Add new product
async function addProduct(product) {
    return await productsDao.addProduct(product);
}

// Edit product
async function editProduct(product) {
    return await productsDao.editProduct(product);
}

// Get all products
async function getAllProductsByCategory(categoryId) {
    return await productsDao.getAllProductsByCategory(categoryId);
}

// Search product by name
async function searchProductsByName(query){
    return await productsDao.searchProductsByName(query);
}

// Get how many products in store
async function getProductsInStoreCount(){
    let count = await productsDao.getProductsInStoreCount();
    return count[0].productsCount;
}

// Get the most popular products
async function getBestSellerProducts(){
    return await productsDao.getBestSellerProducts();
}

module.exports = {
    addProduct,
    editProduct,
    getAllProductsByCategory,
    searchProductsByName,
    getProductsInStoreCount,
    getBestSellerProducts
}