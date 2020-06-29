const express = require("express");
const authController = express.Router();
const User = require("../database/model/user.model");
const asyncHandler = require("express-async-handler");

authController.get(
  "/login",
  asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const correct = await user.checkPassword(password);
    if (!correct) return next({ message: "wrong password" });
    const token = user.getJwtToken();
    res.status(200).json({ success: true, token });
  })
);

authController.get(
  "/signup",
  // eslint-disable-next-line no-unused-vars
  asyncHandler(async (req, res, next) => {
    const { username, password, email, fullname } = req.body;
    const newUser = await User.create({
      username,
      password,
      email,
      fullname,
    });
    const token = newUser.getJwtToken();
    res.status(200).json({ success: true, token });
  })
);

module.exports = authController;
