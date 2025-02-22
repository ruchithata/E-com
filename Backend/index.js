const express = require('express');
const connectDB = require('./src/Database/db');
const Errorhandler = require('./src/Utils/errorhandler');
const app = express();

require('dotenv').config({
    path: 'src/config/.env'
});

const port = process.env.port;
const url = process.env.db_url;

app.use(express.json());
app.use(Errorhandler);

app.get('/', (req,res)=>{
    res.send("Hello World");
})

app.listen(port, async()=>{
    try{
        await connectDB(url);
        console.log(`Server is running in http://localhost:${port}`);
    }
    catch(err){
        console.log("error in index", err);
    }
    
})