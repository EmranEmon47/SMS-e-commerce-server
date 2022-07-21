const express = require("express");
const Signup = require("../Controllers/user/signup");
const Signin = require("../Controllers/user/signin");
const VerifyToken = require("../Controllers/user/verifyToken");
const router = express.Router();

// Signup
router.post("/signup", Signup);
// Signin
router.post("/signin", Signin);
// Verify user with token
router.get("/verify", VerifyToken);

module.exports = router;
