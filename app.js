const express = require('express')
const establishConnection = require('./database/connect')
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;

const {
  userController,
  authController,
  postController,
} = require("./controller/index");

establishConnection();

app.use(cors());
app.use(express.json());
app.use("/auth", authController);
app.use("/user", userController);
app.use("/post", postController);

app.listen(PORT, ()=> {
    console.log(`server started on 8000`);
})