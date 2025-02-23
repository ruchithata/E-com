const { Router } = require("express");
const { upload } = require("../../multer");
const userModel = require("../Models/userModel");
const path = require('path');
const Errorhandler = require("../utils/ErrorHandler");
const { hash } = require("crypto");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({
    path:'src/config/.env'
});


const router = Router();

router.post('/create-user', upload.single('file'), async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        
        const useremail = await userModel.findOne({ email });
        if (useremail) {
            return next(new Errorhandler("User already exists.", 400));
        }

        // const filename = req.file.filename;
        // const fileUrl = path.join('upload', filename);

        bcrypt.hash(password,10,async function(err,hash){
            await userModel.create({
                name: name,
                email: email,
                password: hash
            });
        });

        // const newUser = new userModel({
        //     name: name,
        //     email: email,
        //     password: password,
        //     // avatar: fileUrl
        // });
// console.log(newUser);
     }
    catch (err) {
        next(err);
    }
});


const secret = process.env.PRIVATE_KEY;

router.post('/login', async(req,res,next)=>{
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if (!user){
            return next(new Errorhandler("User dosen't exist", 400));
        }
    
        const checkpassword = bcrypt.compare(password,user.password);
        if (!checkpassword){
            return next(new Errorhandler("Invalid password", 400));
        }
    
        const token = jwt.sign({ email }, secret, { expiresIn:'1h' });
    
        console.log("Logged in successfully", email);
        return res.status(200).json({ token });
    }
    catch (err){
        console.log("error in logging in", err);
    }

});

module.exports = router;