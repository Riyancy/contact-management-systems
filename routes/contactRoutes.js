import express from "express";
import { createContact } from "../controllers/contactController.js";
import { getAllContacts } from "../controllers/contactController.js";

const router = express.Router();

router.post("/create", createContact);
router.get("/getAllContacts", getAllContacts);
export default router;