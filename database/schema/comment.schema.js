const { Schema } = require("mongoose");
const { ObjectId } = Schema.Types;


const CommentSchema = new Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: ObjectId,
    ref: "Post",
    required: true,
  },
  text: {
    type: String,
    required: [true, "Please enter the comment"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = CommentSchema;
