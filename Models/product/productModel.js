const mongoose = require("mongoose");
const validator = require("validator");

const ProductSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.ObjectId,
      required: [true, "Please provide the user id"],
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please provide product title"],
    },
    types: {
      type: String,
      required: [true, "Please provide product types"],
    },
    categories: {
      type: String,
      required: [true, "Please provide product categories"],
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
    },
    details: {
      type: String,
      required: [true, "Please provide product details"],
    },
    weight: {
      type: Number,
      required: [true, "Please provide product weight"],
    },
    size: {
      type: Number,
      required: [true, "Please provide product size"],
    },
    media: [
      {
        types: {
          type: String,
          enum: ["image", "video"],
          required: [true, "Please provide media types"],
        },
        url: {
          type: String,
          required: [true, "Please provide media url"],
          validate: [validator.isURL, " Please provide a valid url"],
        },
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    createdTime: {
      type: Date,
      value: Date.now(),
    },
    updatedTime: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    versionKey: false,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
