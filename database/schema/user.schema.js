const { Schema } = require("mongoose");
const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  fullname: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unqiue: true },
  username: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, maxlength: 6, maxLength: 12 },
  photo: { type: String },
  followers: [{ type: ObjectId, ref: "User" }],
  following: [{ type: ObjectId, ref: "User" }],
});

module.exports = userSchema;
