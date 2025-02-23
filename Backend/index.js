const express = require('express');
const connectDB = require('./src/Database/db');
const router = require('./src/Controllers/users');
const dotenv = require('dotenv');
const error = require('./src/Middleware/error');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL;

if (!DB_URL) {
    console.error("DB_URL is missing in the .env file");
    process.exit(1);
}

app.use(express.json());
app.use('/api/users', router);

app.use(error);

app.get('/', (req,res)=>{
    res.send("Hello World");
})

app.listen(PORT, async()=>{
    try{
        await connectDB(DB_URL);
        console.log(`Server is running in http://localhost:${PORT}`);
    }
    catch(err){
        console.log("error in index", err);
    }
});