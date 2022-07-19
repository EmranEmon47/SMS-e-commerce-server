const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../Helpers/AllCustomError");

const TokenVerify = (req, res, next) => {
  try {
    const { Auth_token } = req.cookies;
    if (Auth_token) {
      jwt.verify(Auth_token, process.env.JWT_SECRET, (error, tokenData) => {
        if (!error) {
          const { user_id } = tokenData;
          req.body.user_id = user_id;
          next();
        } else {
          UnauthorizedError(res);
        }
      });
    } else {
      UnauthorizedError(res);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = TokenVerify;
