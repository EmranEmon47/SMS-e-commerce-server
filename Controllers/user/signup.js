const SendResponse = require("../../Helpers/SendResponse");
const User = require("../../Models/user/userModel");

const Signup = async (req, res, next) => {
  try {
    User.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
      },
      (err, userData) => {
        if (err) {
          if (err.code === 11000) {
            res
              .status(409)
              .send(
                SendResponse(false, "This email address is already exists!")
              );
          } else {
            console.log(err);
            res
              .status(500)
              .send(SendResponse(false, "Found an error from the backend!"));
          }
        } else {
          res.status(201).send(
            SendResponse(true, "User created successfully", {
              _id: userData._id,
              name: userData.name,
              email: userData.email,
              active: userData.active,
            })
          );
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = Signup;
