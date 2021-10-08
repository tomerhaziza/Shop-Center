const usersDao = require("../dao/users-dao");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Login
async function login(user) {
  user.password = crypto
    .createHash("md5")
    .update(
      process.env.JWT_SALT_LEFT + user.password + process.env.JWT_SALT_RIGHT
    )
    .digest("hex");
  const userLoginData = await usersDao.login(user);

  // Check if the userName + password do not match
  if (userLoginData == null || userLoginData.length == 0) {
    const isUserExist = await usersDao.isUserExistByEmail(user.email);
    if (!isUserExist) {
      throw new ServerError(ErrorType.USER_DOES_NOT_EXIST);
    }
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }

  const payload = {
    userId: userLoginData.id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);
  const successfullLoginResponse = {
    token: "Bearer " + token,
    userDetails: userLoginData,
  };
  return successfullLoginResponse;
}

// Google login
async function googleLogin(user) {
  const isUserExist = await usersDao.isUserExistByEmail(user.email);
  if (isUserExist) {
    return await this.loginRegisteredGoogleUser(user.email);
  } else {
    // If user isn't registered, create a new account with his oauth data
    const newUser = {
      email: user.email,
      password: "google-password",
      firstName: user.given_name,
      lastName: user.family_name,
      city: null,
      street: null,
      oAuth: user.sub,
    };
    try {
      await this.addUser(newUser);
      return await this.loginRegisteredGoogleUser(user.email);
    } catch (e) {
      console.log(e);
    }
  }
}

async function loginRegisteredGoogleUser(email) {
  const userDetails = await usersDao.getUserDetailsByEmail(email);

  const payload = {
    userId: userLoginData.id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);
  const successfullLoginResponse = { token: token, userDetails: userDetails };
  return successfullLoginResponse;
}

// New user register
async function addUser(user) {
  // Validations
  if (
    user.email.trim() == "" ||
    user.password.trim() == "" ||
    user.firstName.trim() == "" ||
    user.lastName.trim() == ""
  ) {
    throw new ServerError(ErrorType.MISSING_PARAMETERS);
  }
  // Hash user password
  user.password = crypto
    .createHash("md5")
    .update(
      process.env.JWT_SALT_LEFT + user.password + process.env.JWT_SALT_RIGHT
    )
    .digest("hex");

  return await usersDao.addUser(user);
}

// Get user details by token
async function getUserDetails(userId) {
  return await usersDao.getUserDetails(userId);
}

// Check if user already exist
async function isUserAlreadyExist(userDetails) {
  const emailExist = await usersDao.isUserExistByEmail(userDetails.email);

  if (emailExist) {
    throw new ServerError(ErrorType.USER_EMAIL_ALREADY_EXIST);
  }
  return false;
}

// Update User Details
async function updateUserDetails(user) {
  // Validations
  if (user.firstName.trim() == "" || user.lastName.trim() == "") {
    throw new ServerError(ErrorType.MISSING_PARAMETERS);
  }
  // Hash user new password
  if (user.password.trim()) {
    user.password = crypto
      .createHash("md5")
      .update(
        process.env.JWT_SALT_LEFT + user.password + process.env.JWT_SALT_RIGHT
      )
      .digest("hex");
  }

  return await usersDao.updateUserDetails(user);
}

module.exports = {
  addUser,
  login,
  googleLogin,
  loginRegisteredGoogleUser,
  getUserDetails,
  isUserAlreadyExist,
  updateUserDetails,
};
