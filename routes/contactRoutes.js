import express from "express";
import { createContact } from "../controllers/contactController.js";

const router = express.Router();

router.post("/api/contacts", createContact);
export default router;