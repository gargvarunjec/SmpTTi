import express from "express";
import { createListing, deleteListing } from "../controllers/lisiting.controller.js";
import { verfiyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verfiyUser, createListing);
router.delete('/delete/:id',verfiyUser,deleteListing);
export default router;
