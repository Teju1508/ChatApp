import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn : '1d'
    });

    res.cookie("jwt", token, {
        maxAge : 1*24*3600*1000,
        httpOnly:true, //prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", //CSRF attaacks cross-site request forgery attacks
        secure : process.env.NODE_ENV !== "development"
    });
};

export default generateTokenAndSetCookie;