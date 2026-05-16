import express from "express";
import { createContact } from "../controllers/contactController.js";
import { getAllContacts } from "../controllers/contactController.js";
import { updateContact  } from "../controllers/contactController.js";
import { deleteContact  } from "../controllers/contactController.js";


import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/create",verifyToken, createContact);
router.get("/getAllContacts",verifyToken, getAllContacts);
router.put("/:id",verifyToken, updateContact);
router.delete("/:id",verifyToken, deleteContact);
export default router;