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