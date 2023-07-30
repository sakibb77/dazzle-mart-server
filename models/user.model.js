const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const schema = mongoose.Schema;

const userScheme = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
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
      type: String,
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
  if (!name || !email || !password || !image || !address || !ocupation) {
    throw new Error("all fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw new Error("invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("password is not strong");
  }

  const exist = await this.findOne({ email });

  if (exist) {
    throw new Error("email already exist");
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

//LOGIN METHOD
userScheme.statics.login = async function (email, password) {
  if (!email) {
    throw new Error("please enter your email");
  }

  if (!password) {
    throw new Error("please enter your password");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("incorrect email or password");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("incorrect email or password");
  }

  return user;
};

module.exports = mongoose.model("User", userScheme);
