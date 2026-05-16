import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone || phone.length !== 10 || isNaN(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be exactly 10 digits"
      });
    }

    const contact = await Contact.create(req.body);

    res.status(201).json({
      success: true,
      data: contact
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
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

export const updateContact = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } 
    );

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      data: updatedContact
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update contact",
      error: error.message
    });
  }
};

export const deleteContact = async (req, res) => {
  try {

    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    
    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }

    
    res.status(200).json({
      success: true,
      message: "Contact deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to delete contact",
      error: error.message
    });

  }
};