const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        min:2,
        max:25,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:40,
        required:true

    },
    password: {
        type:String,
        required:true,
        min:8
    },
    profilePicture:{
        type:String,
        default:""
    },
    profielBanner:{
        type:String,
        efault:""
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin: {
        type: Boolean,
        default: false,
      },
},
{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
