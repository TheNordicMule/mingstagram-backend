const express = require("express");
const PostController = express.Router();
const { Post } = require("../database/model/index");
const authenticate = require('../middleware/authenticate')

PostController.get("/", authenticate, (req, res) => {
  const newUser = new Post({
    email: "demo@gmail.com",
    username: "hello",
  });
  newUser.save((err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send("success!");
});

module.exports = PostController;
