const express = require('express')
const establishConnection = require('./database/connect')

const app = express();

const {
  userController,
  authController,
  postController,
} = require("./controller/index");

establishConnection();

app.use(express.json());
app.use("/auth", authController);
app.use("/user", userController);
app.use("/post", postController);

app.listen(8000, ()=> {
    console.log(`server started on 8000`);
})