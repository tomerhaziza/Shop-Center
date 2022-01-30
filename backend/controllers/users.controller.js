const usersDao = require("../models/users-dao");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Login
exports.login = async (req, res, next) => {
  const userDetails = req.body;
  try {
    userDetails.password = crypto
      .createHash("md5")
      .update(
        process.env.JWT_SALT_LEFT +
          userDetails.password +
          process.env.JWT_SALT_RIGHT
      )
      .digest("hex");
    const userLoginData = await usersDao.login(userDetails);

    // Check if the userName + password do not match
    if (userLoginData == null || userLoginData.length == 0) {
      const isUserExist = await usersDao.isUserExistByEmail(userDetails.email);
      if (!isUserExist) {
        throw new ServerError(ErrorType.USER_DOES_NOT_EXIST);
      }
      throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    const payload = {
      userId: userLoginData.id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 86400 * 1000 * 100),
      })
      .json(userLoginData);
  } catch (e) {
    return next(e);
  }
};

// New user register
exports.addUser = async (req, res, next) => {
  const userDetails = req.body;
  try {
    // Validations
    if (
      userDetails.email.trim() == "" ||
      userDetails.password.trim() == "" ||
      userDetails.firstName.trim() == "" ||
      userDetails.lastName.trim() == ""
    ) {
      throw new ServerError(ErrorType.MISSING_PARAMETERS);
    }
    // Hash user password
    userDetails.password = crypto
      .createHash("md5")
      .update(
        process.env.JWT_SALT_LEFT +
          userDetails.password +
          process.env.JWT_SALT_RIGHT
      )
      .digest("hex");

    const response = await usersDao.addUser(userDetails);
    res.json(response);
  } catch (e) {
    return next(e);
  }
};

// Get user details by token
exports.getUserDetails = async (req, res, next) => {
  const { userId } = req.user;
  try {
    const response = await usersDao.getUserDetails(userId);
    res.json(response);
  } catch (e) {
    return next(e);
  }
};

exports.isUserAlreadyExist = async (req, res, next) => {
  const userDetails = req.body;
  try {
    const emailExist = await usersDao.isUserExistByEmail(userDetails.email);
    if (emailExist) {
      throw new ServerError(ErrorType.USER_EMAIL_ALREADY_EXIST);
    }
    res.json(false);
  } catch (e) {
    return next(e);
  }
};

exports.updateUserDetails = async (req, res, next) => {
  const { userId } = req.user;
  const userDetails = req.body;
  userDetails.id = userId;
  try {
    // Validations
    if (
      userDetails.firstName.trim() == "" ||
      userDetails.lastName.trim() == ""
    ) {
      throw new ServerError(ErrorType.MISSING_PARAMETERS);
    }
    // Hash user new password
    if (userDetails.password.trim()) {
      userDetails.password = crypto
        .createHash("md5")
        .update(
          process.env.JWT_SALT_LEFT +
            userDetails.password +
            process.env.JWT_SALT_RIGHT
        )
        .digest("hex");
    }

    const response = await usersDao.updateUserDetails(userDetails);
    res.json(response);
  } catch (e) {
    return next(e);
  }
};

// Get user details by token
exports.logoutUser = async (req, res, next) => {
  try {
    if (req.cookies.token) {
      res.clearCookie("token");
    }
    res.json();
  } catch (e) {
    return next(e);
  }
};

// // Google login
// async function googleLogin(user) {
//   const isUserExist = await usersDao.isUserExistByEmail(user.email);
//   if (isUserExist) {
//     return await this.loginRegisteredGoogleUser(user.email);
//   } else {
//     // If user isn't registered, create a new account with his oauth data
//     const newUser = {
//       email: user.email,
//       password: "google-password",
//       firstName: user.given_name,
//       lastName: user.family_name,
//       city: null,
//       street: null,
//       oAuth: user.sub,
//     };
//     try {
//       await this.addUser(newUser);
//       return await this.loginRegisteredGoogleUser(user.email);
//     } catch (e) {
//       console.log(e);
//     }
//   }
// }

// async function loginRegisteredGoogleUser(email) {
//   const userDetails = await usersDao.getUserDetailsByEmail(email);

//   const payload = {
//     userId: userLoginData.id,
//   };

//   const token = jwt.sign(payload, process.env.JWT_SECRET);
//   const successfullLoginResponse = { token: token, userDetails: userDetails };
//   return successfullLoginResponse;
// }
