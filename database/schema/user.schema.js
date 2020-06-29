const { Schema } = require("mongoose");
const { ObjectId } = Schema.Types;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new Schema({
  fullname: { type: String, trim: true },
  email: { type: String, required: true, trim: true, unqiue: true },
  username: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, minlength: 6, maxLength: 12 },
  photo: { type: String },
  followers: [{ type: ObjectId, ref: "User" }],
  following: [{ type: ObjectId, ref: "User" }],
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

userSchema.methods.getJwtToken = () => {
  return jwt.sign({ username: this.username }, process.env.JWT_SECRET);
};

userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = userSchema;
