const connection = require("./connection-wrapper");
const ServerError = require('../errors/server-error');
const ErrorType = require('../errors/error-type');

// Add new user to DB
async function addUser(user) {
    const sql = `INSERT INTO users (id, email, password, first_name, last_name, city, street)
                 values(?, ?, ?, ?, ?, ?, ?)`;
    const parameters = [user.id, user.email, user.password, user.firstName, user.lastName, user.city, user.street];
    try {
        return await connection.executeWithParameters(sql, parameters);
    }catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

// User login
async function login(user) {
    const sql = `SELECT id, email, first_name AS firstName, last_name AS lastName, city, street, role
                 FROM users where email =? and password =?`;
    const parameters = [user.email, user.password];

    let userLoginData;
    try {
        userLoginData = await connection.executeWithParameters(sql, parameters);
        return userLoginData[0];
    }
    catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }

}

// Check if id already exist
async function isUserExistById(id) {
    try {
        let sql = "SELECT id FROM users WHERE id=?";
        let parameters = [id];
        let result = await connection.executeWithParameters(sql, parameters);

        if (result[0]) {
            return true;
        }
        return false;
    }

    catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

// Check if email already exist
async function isUserExistByEmail(email) {
    try {
        let sql = "SELECT email FROM users WHERE email=?";
        let parameters = [email];

        let result = await connection.executeWithParameters(sql, parameters);

        if (result[0]) {
            return true;
        }
        return false;
        
    }catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

// Get user details by token
async function getUserDetails(userId) {
    const sql = `SELECT id, email, first_name AS firstName, last_name AS lastName, city, street, role
                 FROM users WHERE id = ?`;
    const parameters = [userId];

    let userDetails;
    try {
        userDetails = await connection.executeWithParameters(sql, parameters);
        return userDetails[0];
    }
    catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

async function getUserDetailsByEmail(email) {
    const sql = `SELECT id, email, first_name AS firstName, last_name AS lastName, city, street, role
                 FROM users WHERE email = ?`;
    const parameters = [email];

    let userDetails;
    try {
        userDetails = await connection.executeWithParameters(sql, parameters);
        return userDetails[0];
    }
    catch (e) {
        console.error(e);
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

module.exports = {
    addUser,
    login,
    isUserExistById,
    isUserExistByEmail,
    getUserDetails,
    getUserDetailsByEmail
};