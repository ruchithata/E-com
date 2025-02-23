const { Router } = require("express");
const { upload } = require("../../multer");
const userModel = require("../Models/userModel");
const path = require('path');
const Errorhandler = require("../utils/ErrorHandler");
const { hash } = require("crypto");
const bcrypt = require('bcrypt');

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

module.exports = router;