const express = require('express');
const ServerError = require('../errors/server-error.js');
const ErrorType = require("../errors/error-type");
const router = express.Router();
const usersLogic = require("../logic/users-logic.js");
const userDataService = require('../services/user-data-service');

// User login
router.post("/login", async (req, res, next) => {
    let user = req.body;
    try {
        let successfullLoginData = await usersLogic.login(user);
        res.json(successfullLoginData);
    }
    catch (error) {
        return next(error);
    }
});

router.post("/google-login", async (req, res, next) => {
    let token = req.body.token;
    let user = await userDataService.verify(token);
    try {
        let successfullLoginData = await usersLogic.googleLogin(user);
        res.json(successfullLoginData);
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

// Check if user already exist
router.post("/user-exists", async (req, res, next) => {
    let userDetails = req.body;
    try {
        let userExist = await usersLogic.isUserAlreadyExist(userDetails);
        res.json(userExist);
    } catch (error) {
        return next(error);
    }
})

// Get user details by token
router.get("/me", async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new ServerError(ErrorType.NO_AUTHORIZATION_TOKEN);
        }

        let userId = userDataService.getUserId(req.headers.authorization);
        let userDetails = await usersLogic.getUserDetails(userId);  
        res.json(userDetails);
    }
    catch (error) {
        return next(error);
    }
})

module.exports = router;