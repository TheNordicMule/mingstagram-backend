const mongoose = require("mongoose");
require("dotenv").config();

const establishConnection = ()=>{
    mongoose.connect(process.env.MONGOOSE_ADDRESS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.once("open", function () {
      console.log('database connected!');
    });
}


module.exports=establishConnection