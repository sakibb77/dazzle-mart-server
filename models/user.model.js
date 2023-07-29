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

//=============SIGN UP METHOD=================
userScheme.statics.signup = async function (
  name,
  email,
  password,
  image,
  address,
  ocupation
) {
  if (!name || !email || !password || !image || !address || ocupation) {
    throw new Error("all fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw new Error("invalid email");
  }

  if (!validator.idStrongPassword(password)) {
    throw new Error("password is not strong");
  }

  //----------GENARATE SALT-----------
  const salt = await bcrypt.genSalt(10);

  //----------PASS WORD HASING-----------------
  const hash = await bcrypt.hash(password, salt);

  //---------create user---------
  const user = await this.create({
    name,
    email,
    password: hash,
    image,
    address,
    ocupation,
  });

  return user;
};

module.exports = mongoose.model("User", userScheme);
