import express from "express";
import { createListing } from "../controllers/lisiting.controller.js";
import { verfiyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verfiyUser, createListing);

export default router;
