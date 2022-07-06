const mongoose = require("mongoose");
const SendResponse = require("./SendResponse");

const ErrorFunction = async (err, req, res, next) => {
  res.status(500).send(SendResponse(false, "Found an error from the backend!"));
};
module.exports = ErrorFunction;
