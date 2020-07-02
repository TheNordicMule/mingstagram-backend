/* eslint-disable no-unused-vars */
const express = require("express");
const authController = express.Router();
const User = require("../database/model/user.model");
const asyncHandler = require("express-async-handler");

authController.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ success: false, message: "No user found" });
    const correct = await user.checkPassword(password);
    if (!correct)
      return res
        .status(422)
        .json({ success: false, message: "Wrong password!" });
    const token = user.getJwtToken();
    user = await User.findOne({ username }).select("-password");
    console.log(user);
    res.status(200).json({ success: true, token, user });
  })
);

authController.post(
  "/signup",
  asyncHandler(async (req, res, next) => {
    const { username, password, email, fullname } = req.body;
    if (
      (await User.count({ username })) != 0 ||
      (await User.count({ email })) != 0
    ) {
      return next(JSON.stringify({ message: "Such accounts already exists" }));
    }
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
