const express = require("express");
const { category } = require("../controllers/category");
const router = express.Router();

router.post("/category",category);
// router.get("/categories",getAllCategories)
// router.get("/getcategory/:id",categoryById)

module.exports = router;