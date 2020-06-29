const express = require("express");
const userController = express.Router();
const {User} = require('../database/model/index')

userController.get("/", (req, res) => {
  const newUser = new User({
    email: "demo@gmail.com",
    username: "hello",
  });
  newUser.save((err) => {
    if (err) {
      console.log(err);
    }
  })
  res.send('success!');
});

module.exports = userController
