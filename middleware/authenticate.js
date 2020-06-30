const jwt = require("jsonwebtoken");
const User = require("../database/model/user.model");
const asyncHandler = require("express-async-handler");

const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      JSON.stringify({ message: "You must be signed in to do this!" })
    );
  }
  const info = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({username: info.username});
  console.log(user);
  if (!user) {
    return next(JSON.stringify({ message: "No user with that token found" }));
  }
  req.user = user;
  next();
});

module.exports = authenticate;
