/* eslint-disable no-unused-vars */
const express = require("express");
const userController = express.Router();
const { User } = require("../database/model/index");
const asyncHandler = require("express-async-handler");
const authenticate = require("../middleware/authenticate");

//get route for all users /user (GET)
userController.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const users = await User.find().lean().exec();
    res.status(200).json({ success: true, users });
  })
);

//SHOW info about the user profile /user/:id (GET)
userController.get(
  "/:username",
  asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ username: req.params.username })
      .lean()
      .exec();
    if (user == null)
      return res.json({ success: false, message: "No such user found" });
    res.status(200).json({ sucess: true, user });
  })
);

//UPDATE the user profile /user/:username (PUT)
userController.put(
  "/:username",
  authenticate,
  asyncHandler(async (req, res, next) => {
    const { username } = req.user;
    const { password, photo, followers, following, fullname, email } = req.body;
    const doc = await User.findOneAndUpdate({ username }, req.body);
    res.status(200).json({ sucess: true });
  })
);

module.exports = userController;
