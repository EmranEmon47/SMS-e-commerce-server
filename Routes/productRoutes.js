const express = require("express");
const productAdd = require("../Controllers/product/productAdd");
const TokenVerify = require("../Middleware/tokenVerify");
const router = express.Router();

// Product Add
router.post("/add", TokenVerify, productAdd);

module.exports = router;
