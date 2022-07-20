const { NotFoundError, BackendError } = require("../../Helpers/AllCustomError");
const SendResponse = require("../../Helpers/SendResponse");
const Product = require("../../Models/product/productModel");
const User = require("../../Models/user/userModel");

const productAdd = async (req, res, next) => {
  try {
    User.exists({ _id: req.body.user_id }, (err) => {
      if (!err) {
        Product.create(req?.body, (err2, productData) => {
          if (!err2) {
            res
              .status(201)
              .send(
                SendResponse(true, "Product added successfully", productData)
              );
          } else {
            BackendError(res);
          }
        });
      } else {
        NotFoundError(res, "User not found");
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = productAdd;
