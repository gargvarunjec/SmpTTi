import express from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { verfiyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verfiyUser , updateUser);

export default router;
