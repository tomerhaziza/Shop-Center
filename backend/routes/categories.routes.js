const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories.controller");

// Get all categories
router.get("/", categoriesController.getAllCategories);

module.exports = router;
