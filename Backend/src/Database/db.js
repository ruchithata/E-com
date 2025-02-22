const {connect} = require('mongoose');

const connectDB = async(url)=>{
    try{
        await connect(url);
        console.log("Database is connected");
    }
    catch(err){
        console.log("Error in db",err);
    }
}

module.exports = connectDB;