const usersDao = require("../dao/users-dao");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const crypto = require('crypto');
const config = require('../config.json');
const jwt = require('jsonwebtoken');

// Login
async function login(user) {
    user.password = crypto.createHash("md5").update(config.saltLeft + user.password + config.saltRight).digest("hex");
    const userLoginData = await usersDao.login(user);

    // Check if the userName + password do not match
    if (userLoginData == null || userLoginData.length == 0) {
        let isUserExist = await usersDao.isUserExistByEmail(user.email);
        if (!isUserExist){
            throw new ServerError(ErrorType.USER_DOES_NOT_EXIST);
        }
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    const payload = {
        sub: config.saltLeft + userLoginData.id + config.saltRight,
        userId: userLoginData.id,
        role: userLoginData.role
    }

    const token = jwt.sign(payload, config.secret);
    const successfullLoginResponse = { token: token, userDetails: userLoginData };
    return successfullLoginResponse;
}

// Google login
async function googleLogin(user) {
    let isUserExist = await usersDao.isUserExistByEmail(user.email);
    if (isUserExist){
        return await this.loginRegisteredGoogleUser(user.email);
    }

    else{ // If user isn't registered, create a new account with his oauth data
        let newUser = {
            id: user.sub,
            email: user.email,
            password: 'google-password',
            firstName: user.given_name,
            lastName: user.family_name,
            city: null,
            street: null
        }
        try{
            await this.addUser(newUser);
            return await this.loginRegisteredGoogleUser(user.email);
        }catch(e){
            console.log(e);
        }
    }
}

async function loginRegisteredGoogleUser(email){
    let userDetails = await usersDao.getUserDetailsByEmail(email)
    
    const payload = {
        sub: config.saltLeft + userDetails.id + config.saltRight,
        userId: userDetails.id,
        role: userDetails.role
    }

    const token = jwt.sign(payload, config.secret);
    const successfullLoginResponse = { token: token, userDetails: userDetails };
    return successfullLoginResponse;
}

// New user register
async function addUser(user) {
    // Validations
    if ( user.id == null || user.email.trim() == '' || user.password.trim() == '' ||
         user.firstName.trim() == '' || user.lastName.trim() == '' ) {
        throw new ServerError(ErrorType.MISSING_PARAMETERS);
    }
    // Hash user password
    user.password = crypto.createHash("md5").update(config.saltLeft + user.password + config.saltRight).digest("hex");

    return await usersDao.addUser(user);
}

// Get user details by token
async function getUserDetails(userId) {
    return await usersDao.getUserDetails(userId);
}

// Check if user already exist
async function isUserAlreadyExist(userDetails) {
    let idExist = await usersDao.isUserExistById(userDetails.id);
    let emailExist = await usersDao.isUserExistByEmail(userDetails.email);
    if (idExist && emailExist){
        throw new ServerError(ErrorType.USER_ALREADY_EXIST);
    }
    
    if (idExist) {
        throw new ServerError(ErrorType.USER_ID_ALREADY_EXIST);
    }
    
    if (emailExist) {
        throw new ServerError(ErrorType.USER_EMAIL_ALREADY_EXIST);
    }
    return false;
}


module.exports = {
    addUser,
    login,
    googleLogin,
    loginRegisteredGoogleUser,
    getUserDetails,
    isUserAlreadyExist
};