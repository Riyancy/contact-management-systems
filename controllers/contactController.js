import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
    const contact = await Contact.create(req.body);
    res.json(contact);
};