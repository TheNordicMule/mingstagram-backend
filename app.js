const express = require('express')

const app = express();

const {userController} = require('./controller/index');

app.use(express.json());

app.use("/", userController);

app.listen(8000, ()=> {
    console.log(`server started on 8000`);
})