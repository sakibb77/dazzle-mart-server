const express = require("express");
const { createUser, loginUser } = require("../controllers/user.controller.js");

const router = express.Router();

//REGISTER
router.post("/auth/register", createUser);
//LOGIN
router.post("/auth/login", loginUser);

module.exports = router;
