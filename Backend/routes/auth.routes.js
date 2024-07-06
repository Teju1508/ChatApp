import express from "express";
import { login, logout, signUp } from "../controllers/auth.controllers.js";
const router = express.Router();

// router.get("/signup", (req, res) => {
//     res.send("Signup");
// });
// instead of this, below format can be used for neat code

router.get("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

export default router;