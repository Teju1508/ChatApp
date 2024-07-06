import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 8
    },
    gender : {
        type : String,
        required : true,
        enum : ["Male", "Female"]
    },
    profilePic : {
        type : String,
        default : ""
    }
});

const User = mongoose.model("User", userSchema);
// "User" - this should be singular and start with Cap

export default User;