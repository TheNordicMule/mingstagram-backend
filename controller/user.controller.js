/* eslint-disable no-unused-vars */
const express = require("express");
const userController = express.Router();
const { User } = require("../database/model/index");
const asyncHandler = require("express-async-handler");

//get route for all users
userController.get(
  "/",
  asyncHandler(async (req, res, next) => {
    console.log(req.params);
    const users = await User.find().lean().exec();
    res.status(200).json({ success: true, users });
  })
);

//get route for a specific user
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

module.exports = userController;
