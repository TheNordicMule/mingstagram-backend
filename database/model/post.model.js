const mongoose = require("mongoose");
const PostSchema = require("../schema/post.schema");

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
