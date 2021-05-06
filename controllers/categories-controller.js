const express = require('express');
const router = express.Router();
const categoriesLogic = require('../logic/categories-logic');

// Get all categories
router.get("/", async (req, res, next) => {
    try {
        let allCategories = await categoriesLogic.getAllCategories();
        res.json(allCategories);
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});


module.exports = router;