const express = require('express')
const establishConnection = require('./database/connect')

const app = express();

const {userController} = require('./controller/index');

establishConnection();

app.use(express.json());
app.use("/", userController);

app.listen(8000, ()=> {
    console.log(`server started on 8000`);
})