const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const socialAuth = require("../services/social-auth");

// User login
router.post("/login", usersController.login);

// New user register
router.post("/register", usersController.addUser);

// Check if user already exist (for register)
router.post("/user-exists", usersController.isUserAlreadyExist);

// Update user details from user panel
router.put("/update", usersController.updateUserDetails);

// Get user details by token
router.get("/me", usersController.getUserDetails);

// Logout user by deleting cookie token
router.delete("/logout", usersController.logoutUser);

// router.post("/google-login", async (req, res, next) => {
//   const token = req.body.token;
//   const user = await socialAuth.verify(token);
//   try {
//     const successfullLoginData = await usersController.googleLogin(user);
//     res
//       .cookie("token", successfullLoginData.token, {
//         httpOnly: true,
//         expires: new Date(Date.now() + 86400 * 1000 * 100),
//       })
//       .json(successfullLoginData.userDetails);
//   } catch (error) {
//     return next(error);
//   }
// });

module.exports = router;
