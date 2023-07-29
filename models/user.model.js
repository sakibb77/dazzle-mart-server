const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require(bcrypt);

const userScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    ocupation: {
      type: String,
      required: true,
    },
    role: {
      enum: ["user", "seller", "admin"],
      default: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userScheme);
