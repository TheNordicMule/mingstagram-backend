const express = require("express");
const PostController = express.Router();
const { Post } = require("../database/model/index");
const authenticate = require("../middleware/authenticate");
const asyncHandler = require("express-async-handler");

// Create a post
PostController.post("/", authenticate, (req, res) => {
  const {email, username, title, body, photo} = req.body;
  const newUser = new Post({
    email,
    username,
    title,
    body,
    photo,
  });
  newUser.save((err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send("success!");
});

//get all posts
PostController.get(
  "/",
  authenticate,
  // eslint-disable-next-line no-unused-vars
  asyncHandler(async (req, res, next) => {
    const result = await Post.find();
    res.status(200).json({ success: true, posts: result });
  })
);


module.exports = PostController;
