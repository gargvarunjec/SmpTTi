import express from "express";
import {
  google,
  signIn,
  signOut,
  signup,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signIn);
authRouter.post("/google", google);
authRouter.get("/signout", signOut);
export default authRouter;
