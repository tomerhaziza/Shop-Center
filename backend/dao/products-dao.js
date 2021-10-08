const connection = require("./connection-wrapper");
const ServerError = require('../errors/server-error');
const ErrorType = require('../errors/error-type');

// Add new product
async function addProduct(product) {
    const sql = "INSERT INTO products (name, price, image_url, category_id)  values(?, ?, ?, ?)";
    const parameters = [product.name, product.price, product.imageUrl, product.categoryId];
    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

// Edit product
async function editProduct(product) {
    const sql = "UPDATE products SET name = ?, price = ?, image_url = ?, category_id = ? WHERE id = ?";
    const parameters = [product.name, product.price, product.imageUrl, product.categoryId, product.id];
    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

// Get products by category
async function getAllProductsByCategory(categoryId) {
    const sql = ` SELECT id, name, price, image_url AS imageUrl, category_id AS categoryId 
                FROM products WHERE category_id = ? `;
    const parameters = [ categoryId ];

    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

// Search product by name
async function searchProductsByName(categoryId) {
    const sql = ` SELECT id, name, price, image_url as imageUrl, category_id AS categoryId
                FROM products WHERE name like '%' ? '%' LIMIT 40`;
    const parameters = [ categoryId ];

    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

// Get the most popular products
async function getBestSellerProducts() {
    const sql =  `SELECT products.id, products.name, price, image_url AS imageUrl, category_id AS categoryId
                FROM shopping_online.cart_items
                INNER JOIN products
                ON cart_items.product_id = products.id
                GROUP BY product_id ORDER BY COUNT(*) DESC LIMIT 10`;

    try {
        return await connection.execute(sql);
    }
    catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

async function getProductsInStoreCount() {
    const sql = "SELECT COUNT(*) as productsCount FROM products";

    try {
        return await connection.execute(sql);
    }
    catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

module.exports = {
    addProduct,
    editProduct,
    getAllProductsByCategory,
    searchProductsByName,
    getProductsInStoreCount,
    getBestSellerProducts
}