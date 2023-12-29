const mongoose = require('mongoose');
const db = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connected Sucessfully...")
        }catch(error){
        console.log("Error While Connecting DB: ", error);
        }
};

module.exports = db;