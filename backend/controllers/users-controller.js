const express = require('express');
const ServerError = require('../errors/server-error.js');
const ErrorType = require("../errors/error-type");
const router = express.Router();
const usersLogic = require("../logic/users-logic.js");
const socialAuth = require('../services/social-auth');

// User login
router.post("/login", async (req, res, next) => {
    let user = req.body;
    try {
        let successfullLoginData = await usersLogic.login(user);
        res
            .cookie("token", successfullLoginData.token, { httpOnly: true, expires: new Date(Date.now() + 86400 * 1000 * 100) })
            .json(successfullLoginData.userDetails);
    }
    catch (error) {
        return next(error);
    }
});

router.post("/google-login", async (req, res, next) => {
    let token = req.body.token;
    let user = await socialAuth.verify(token);
    try {
        let successfullLoginData = await usersLogic.googleLogin(user);
        res
            .cookie("token", successfullLoginData.token, { httpOnly: true, expires: new Date(Date.now() + 86400 * 1000 * 100) })
            .json(successfullLoginData.userDetails);
    }
    catch (error) {
        return next(error);
    }
});

// New user register
router.post("/register", async (req, res, next) => {
    let user = req.body;
    try {
        let successfulRegiseterDetails = await usersLogic.addUser(user);
        res.json(successfulRegiseterDetails);
    } catch (error) {
        console.log(error);
        return next(error);
    }
})

// Check if user already exist (for register)
router.post("/user-exists", async (req, res, next) => {
    let userDetails = req.body;
    try {
        let userExist = await usersLogic.isUserAlreadyExist(userDetails);
        res.json(userExist);
    } catch (error) {
        return next(error);
    }
})

// Update user details from user panel
router.put("/update", async (req, res, next) => {
    let userId = req.user.sub;
    let user = req.body;
    user.id = userId;
    try {
        let successfulUpdateResponse = await usersLogic.updateUserDetails(user);
        res.json(successfulUpdateResponse);
    } catch (error) {
        console.log(error);
        return next(error);
    }
})

// Get user details by token
router.get("/me", async (req, res, next) => {
    try {
        let userId = req.user.sub;
        let userDetails = await usersLogic.getUserDetails(userId);
        res.json(userDetails);
    }
    catch (error) {
        return next(error);
    }
})

// Logout user by deleting cookie token
router.delete("/logout", async (req, res, next) => {
    try {
        if (req.cookies.token){
            res.clearCookie('token');
        }
        res.json()
    }
    catch (error) {
        return next(error);
    }
})

module.exports = router;