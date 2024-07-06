import User from "../models/db.user.model.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signUp = async(req, res) => {
    try {

        const {fullName, userName, password, confirmPassword, gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error: "Passwords not matched"});
        }

        const user = await User.findOne({userName});

        if(user){
            return res.status(400).json({error: "User already exists"});
        }

        let profilePicture = '';
        if(gender === "Male"){
            profilePicture =  `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        }else{
            profilePicture = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
        }


        const salt = await bcrypt.genSalt(10);
        // more the value, more secured password hashing but for more value, takes more time
        // generally 10 is used
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            userName,
            password : hashPassword,
            gender,
            profilePic : profilePicture
        });

        if(newUser){
            // Generate JWT token
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id : newUser._id,
                fullName : newUser.fullName,
                userName : newUser.userName,
                profilePicture : newUser.profilePic
            });
        }else{
            res.status(400).json({error: "Invalid user data"});
        }

    } catch (error) {
        console.log("Exception at signUp function " + error.message);
        res.status(500).json({error: "Internal server error"});
    }
};

export const login = async(req, res) => {
    try {
        const {userName, password} = req.body;
        const userFromDB = await User.findOne({userName});

        const comparePassword = await bcrypt.compare(password, userFromDB ?.password || "");
        // if userFromDB exists then compares password of that item else consider empty string

        if(!userFromDB || !comparePassword){
            return res.status(400).json({error: "Invalid username or password"});
        }

        generateTokenAndSetCookie(userFromDB._id, res);
        res.status(200).json({
            _id : userFromDB._id,
            fullName : userFromDB.fullName,
            userName : userFromDB.userName,
            profilePic : userFromDB.profilePic
        });
    } catch (error) {
        console.log("Error at login function "+e.message);
        res.status(500).json({error: "Internal server error"});
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge : 0});
        res.status(200).json({message: "Logged out succesfully"});
    } catch (error) {
        console.log("Error at logout function "+e.message);
        res.status(500).json({error: "Internal server error"});
    }
};