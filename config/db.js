const mongoose = require('mongoose');
require('dotenv').config()
module.exports.connectDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.DB_URI)
        console.log("connected to DB");
        
    } catch (error) {
        console.log(error);
        
    }
}