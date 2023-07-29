const User = require("../models/user.model");

const createUser = async (req, res) => {
  try {
    const { name, email, password, image, address, ocupation } = req.body;

    const user = await User.signup(
      name,
      email,
      password,
      image,
      address,
      ocupation
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const loginUser = async (req, res) => {};

module.exports = { createUser, loginUser };
