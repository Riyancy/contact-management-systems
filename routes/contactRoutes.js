import express from "express";
import { createContact } from "../controllers/contactController.js";
import { getAllContacts } from "../controllers/contactController.js";
import { updateContact  } from "../controllers/contactController.js";
import { deleteContact  } from "../controllers/contactController.js";



const router = express.Router();

router.post("/create", createContact);
router.get("/getAllContacts", getAllContacts);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);
export default router;