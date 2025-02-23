const { model, Schema } = require("mongoose");


const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 4,
        select: false,
    },
    // phoneNumber:{
    //     type: Number,
    //     required: true,
    // },
    // addresses:[
    //     {
    //         country:{
    //             type: String,
    //             required: true,
    //         },
    //         city:{
    //             type: String,
    //             required: true,
    //         },
    //         address1:{
    //             type: String,
    //             required: true,
    //         },
    //         address2:{
    //             type: String,
    //             required: true,
    //         },
    //         zipcode:{
    //             type: Number,
    //             required: true,
    //         }
    //     }
    // ],
    // role:{
    //     type: String,
    //     required: true,
    //     default: "user",
    // },
    // avatar:{
    //     public_id:{
    //         type: String,
    //         required: true,
    //     },
    //     url:{
    //         type: String,
    //         required: true,
    //     }
    // },
    // createdAt:{
    //     type: Date,
    //     default: Date.now(),
    // },
    // resetPasswordToken: String,
    // resetPasswordTime: Date,
});

const userModel =  model("User", userSchema);

module.exports = userModel;