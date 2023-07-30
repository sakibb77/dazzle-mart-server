const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw new Error("invalid token format");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new Error("no token is provide");
    }

    //VARIFY TOKEN
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(id);

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { isAuthenticated };
