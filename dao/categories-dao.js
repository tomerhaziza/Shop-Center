let connection = require("./connection-wrapper");
const ServerError = require('../errors/server-error');
const ErrorType = require('../errors/error-type');

// Get all categories
async function getAllCategories() {
    let sql = "SELECT * FROM categories";

    try {
        return await connection.execute(sql);
    }
    catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

module.exports = {
    getAllCategories
}