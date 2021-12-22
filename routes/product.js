const express = require("express");
const { products, updateProduct, getAllProducts, productById } = require("../controllers/products");
const router = express.Router();

router.post("/products",products);
router.put("/product/:id",updateProduct)
router.get("/products",getAllProducts)
router.get("/getproduct/:id",productById)

module.exports = router;