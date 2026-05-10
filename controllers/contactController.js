import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    res.status(201).json({
      success: true,
      message: "Contact created successfully",
      data: contact
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create contact",
      error: error.message
    });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();

    res.status(200).json({
      success: true,
      message: "Contacts fetched successfully",
      data: contacts
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
      error: error.message
    });
  }
};