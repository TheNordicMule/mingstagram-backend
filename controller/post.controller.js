/* eslint-disable no-unused-vars */
const express = require("express");
const postController = express.Router();
const { Post } = require("../database/model/index");
const authenticate = require("../middleware/authenticate");
const asyncHandler = require("express-async-handler");

//get all posts
postController.get(
  "/",
  authenticate,
  // eslint-disable-next-line no-unused-vars
  asyncHandler(async (req, res, next) => {
    const result = await Post.find();
    res.status(200).json({ success: true, posts: result });
  })
);

// Create a post
postController.post("/", authenticate, (req, res) => {
  const { title, body, photo } = req.body;
  const newUser = new Post({
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

//SHOW info about the user profile /post/:title (GET)
postController.get(
  "/:title",
  asyncHandler(async (req, res, next) => {
    const title = req.params.title;
    console.log(title);
    const post = await Post.findOne({title}).lean().exec();
    if (post == null)
      return res.json({ success: false, message: "No such user found" });
    res.status(200).json({ sucess: true, post });
  })
);

//UPDATE the user profile /post/:title (PUT)
postController.put(
  "/:title",
  authenticate,
  asyncHandler(async (req, res, next) => {
    const title = req.params.title;
    const post = await Post.findOneAndUpdate({ title }, req.body);
    res.status(200).json({ sucess: true, post });
  })
);

module.exports = postController;
