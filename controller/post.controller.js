/* eslint-disable no-unused-vars */
const express = require("express");
const postController = express.Router();
const { Post, Comment } = require("../database/model/index");
const authenticate = require("../middleware/authenticate");
const asyncHandler = require("express-async-handler");

//get all posts
postController.get(
  "/",
  authenticate,
  // eslint-disable-next-line no-unused-vars
  asyncHandler(async (req, res, next) => {
    const result = await Post.find()
      .populate({ path: "postedBy", select: "photo username" })
      .populate({
        path: "comments",
        select: "text",
        populate: {
          path: "user",
          select: "username"
        }
      })
      .lean()
      .exec();
    res.status(200).json({ success: true, posts: result });
  })
);

// Create a post
postController.post("/", authenticate, (req, res) => {
  const { body, photo } = req.body;
  const postedBy = req.user;
  console.log(postedBy);
  const newUser = new Post({
    postedBy,
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
    const post = await Post.findOne({ title }).lean().exec();
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

// Post a new comment /:id/comment(POST)
postController.post(
  "/:id/comment",
  authenticate,
  asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    let comment = await Comment.create({
      user: req.user.id,
      post: req.params.id,
      text: req.body.text,
    });
    post.comments.push(comment._id);
    // console.log(post);
    // post.comments = comment;
    await post.save();

    comment = await comment
      .populate({ path: "user", select: "photo username fullname" })
      .execPopulate();

    res.status(200).json({ success: true, data: comment });
  })
);

// // get all comments /:id/comment(GET)
// postController.get(
//   "/:id/comment",
//   authenticate,
//   asyncHandler(async (req, res, next) => {
//     const post = await Post.findById(req.params.id);
//     console.log(post);
//     res.status(200).json({ success: true, data: comments });
//   })
// );

module.exports = postController;
