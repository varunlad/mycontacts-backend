const expressAsyncHandler = require("express-async-handler");
const createContact = require("../modal/createContactModal");

const getAllContacts = expressAsyncHandler(async (req, res) => {
  try {
    //Get all Data
    const contacts = await createContact.find({});
    if (contacts.length > 0) {
      return res.status(200).json({
        data: contacts,
        status: {
          code: 200,
          message: "Contacts retrieved successfully",
        },
      });
    } else {
      return res.status(200).json({
        data: [],
        status: {
          code: 200,
          message: "No contacts data to display.",
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      data: [],
      status: {
        code: 500,
        message: error.message,
      },
    });
  }
});
const createMyContact = async (req, res) => {
  try {
    const { name, email, phone, companyName } = req.body;
    // Check if all fields are present
    if (!name || !email || !phone || !companyName) {
      return res.status(400).json({
        data: [],
        status: {
          code: 400,
          message: "All fields are mandatory",
        },
      });
    }
    // Check for duplicate email
    const unique = await createContact.findOne({ email });
    console.log("unique===", unique);
    if (unique) {
      return res.status(409).json({
        data: [],
        status: {
          code: 409,
          message: "Contact already exists",
        },
      });
    }
    // Create new contact
    const newContact = await createContact.create({
      name,
      email,
      phone,
      companyName,
    });
    console.log("newContact===", newContact);

    return res.status(201).json({
      data: [newContact],
      status: {
        code: 201,
        message: "Contact created successfully",
      },
    });
  } catch (error) {
    // Catch any unexpected errors
    return res.status(500).json({
      data: [],
      status: {
        code: 500,
        message: error.message,
      },
    });
  }
};
const getMyContact = expressAsyncHandler(async (req, res) => {
  try {
    // Extract and validate email from the request parameters
    const emailParam = req.params.id.split("=")[1];
    if (!emailParam) {
      return res
        .status(400)
        .json({ message: "Invalid request format. Email not provided." });
    }
    console.log("email==", emailParam);

    // Check if a contact with the given email exists
    const unique = await createContact.findOne({ email: emailParam });

    if (unique) {
      return res.status(200).json({
        data: unique,
        message: `Contact found for ${emailParam}`,
      });
    } else {
      return res.status(404).json({ message: "Contact not found." });
    }
  } catch (error) {
    console.error("Error fetching contact:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
const updateMyContact = expressAsyncHandler(async (req, res) => {
  try {
    const email = req.params.id.split("=")[1];
    const { name, phone, companyName } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Invalid request format. Email not provided.' });
    }

    console.log("email==", email);

    // Check if the contact exists
    const contact = await createContact.findOne({ email: email });
    if (!contact) {
        return res.status(404).json({ message: 'Contact not found.' });
    }

    // Update the contact fields
    if (name) contact.name = name;
    if (phone) contact.phone = phone;
    if (companyName) contact.companyName = companyName;

    // Save the updated contact
    const updatedContact = await contact.save();

    return res.status(200).json({
        data: [updatedContact],
        status: {
            code: 200,
            message: 'Contact updated successfully',
        },
    });
} catch (error) {
    console.error('Error updating contact:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
}

});
const deletMyContact = expressAsyncHandler(async (req, res) => {
  try {
    const email = req.params.id.split("=")[1];
    if (!email) {
      return res
        .status(400)
        .json({ message: "Invalid request format. Email not provided." });
    }

    console.log("email==", email);

    // Delete the contact with the given email
    const result = await createContact.deleteOne({ email: email });

    if (result.deletedCount > 0) {
      return res
        .status(200)
        .json({ status: {
          code: 200,
          message: 'Contact deleted successfully',
      }, });
    } else {
      return res.status(404).json({ status: {
        code: 204,
        message: 'Error while deleting contact',
    }, });
    }
  } catch (error) {
    console.error("Error deleting contact:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = {
  getAllContacts,
  getMyContact,
  createMyContact,
  updateMyContact,
  deletMyContact,
};
