const { createToken } = require("../helpers/token.helper");
const User = require("../models/user.model");

//USER CREATE CONTROLLER FUNCTION
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

    //GENARATE TOKEN
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//USER LOGIN CONTROLLER FUNCTION
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.login(email, password);

    //GENARATE TOKEN
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createUser, loginUser };
