const { Schema } = require("mongoose");
const { ObjectId } = Schema.Types;

const PostSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    likesCount: {
      type: Number,
      default: 0,
    },
    comments: [{ type: ObjectId, ref: "Comment" }],
    // comments: { type: ObjectId, ref: "Comment" },
    postedBy: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = PostSchema;
