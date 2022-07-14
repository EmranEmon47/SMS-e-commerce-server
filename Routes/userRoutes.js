const express = require("express");
const Signup = require("../Controllers/user/signup");
const Signin = require("../Controllers/user/signin");
const router = express.Router();

// Signup
router.post("/signup", Signup);
// Signin
router.post("/signin", Signin);

module.exports = router;
