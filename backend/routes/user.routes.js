import express from "express";
import {
  deleteUser,
  test,
  updateUser,
} from "../controllers/user.controller.js";
import { verfiyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verfiyUser, updateUser);
router.delete("/delete/:id", verfiyUser, deleteUser);
export default router;
