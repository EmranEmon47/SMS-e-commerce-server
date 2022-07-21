const { UnauthorizedError } = require("../../Helpers/AllCustomError");
const jwt = require("jsonwebtoken");
const SendResponse = require("../../Helpers/SendResponse");
const User = require("../../Models/user/userModel");

const VerifyToken = async (req, res, next) => {
  try {
    const { Auth_token = undefined } = req.cookies;
    // Check token is available or not
    if (Auth_token) {
      // Verify JWT token
      jwt.verify(Auth_token, process.env.JWT_SECRET, (err, user_token_data) => {
        if (err) {
          UnauthorizedError(res);
        } else {
          User.findById(
            { _id: user_token_data?.user_id },
            { email: 1 },
            (err, userData) => {
              // Check email is found
              if (userData?.email) {
                // Verify complete and user is valid
                res
                  .status(200)
                  .send(SendResponse(true, "User verification successful"));
              } else {
                UnauthorizedError(res);
              }
            }
          );
        }
      });
    } else {
      UnauthorizedError(res);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = VerifyToken;
