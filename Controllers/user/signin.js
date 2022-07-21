const validator = require("validator");
const bcrypt = require("bcrypt");
const SendResponse = require("../../Helpers/SendResponse");
const jwt = require("jsonwebtoken");
const {
  BadReqError,
  UnauthorizedError,
} = require("../../Helpers/AllCustomError");
const User = require("../../Models/user/userModel");

const Signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Chech user inputs
    if (validator.isEmail(email) && validator.isLength(password, { min: 6 })) {
      // Find the user data from database
      const userData = await User.findOne({ email: email }, { password: 1 });

      // Check user is available
      if (userData) {
        // Check password is correct or not
        bcrypt.compare(
          password,
          userData?.password,
          async (err, matchResult) => {
            if (matchResult) {
              // Generate the JWT token
              const token = await jwt.sign(
                {
                  email,
                  user_id: userData?._id,
                },
                process.env.JWT_SECRET,
                {
                  expiresIn: process.env.JWT_EXPIRES_IN,
                }
              );
              // Expire date calculate
              const date = new Date();
              date.setMonth(date.getMonth() + 2);
              // Cookie set
              res.cookie("Auth_token", token, {
                httpOnly: true,
                expires: date,
                sameSite: "none",
                secure:
                  process?.env?.MODE == "DEVELOPMENT" ? false : true,
              });
              res.status(200).send(SendResponse(true, "Signin successful"));
            } else {
              UnauthorizedError(res);
            }
          }
        );
      } else {
        UnauthorizedError(res);
      }
    } else {
      BadReqError(res, "Provided data is not valid.");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = Signin;
