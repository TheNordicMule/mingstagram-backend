const express = require("express");
const PostController = express.Router();
const { Post } = require("../database/model/index");

PostController.get("/", (req, res) => {
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
