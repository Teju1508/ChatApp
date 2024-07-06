// const express = require("express");
// const dotenv = require("dotenv");
// To use import express from "express", add type:"module" in package.json

import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectToDB from "./db/dbConnection.js";
import authRoutes from "./routes/auth.routes.js";
import randomBase64String from "./utils/generateJWTSecret.js";

// to avoid re-start everytime, npm i nodemon --save-dev -- save-dev is to say its dev dependency
// and by changing in package.json - "scripts": {
//     "server": "nodemon Backend/server.js" (from node Backend/server.js)
// }

const app = express();
const PORT = process.env.PORT || 5000;
// as it can't directly fetch env, we need dotenv import
app.listen(PORT, () => {
    // const secret = randomBase64String;
    // console.log("JWT secret: "+secret);
    // this is used to generate secret key for token
    
    connectToDB();
    console.log('server running on port '+PORT)
});


app.get("/", (req, res) => {
    res.send("Working");
});


app.use(express.json()); 
// to parse incoming request with Json payloads - req.body for API

app.use("/api/auth", authRoutes);
