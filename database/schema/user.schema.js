const { Schema } = require("mongoose");

const userSchema = new Schema({
  fullname: { type: String, required: false },
  email: { type: String, required: true },
  username: { type: String, required: true },
});

module.exports = userSchema;
