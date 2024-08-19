// controllers/contactController.js
const mongoose = require('mongoose');
const Contact = require('../models/Contact');

// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({success: true, data: contacts});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
    
  }
};

// Get a single contact by ID
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new contact
exports.createContact = async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });

  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a contact by ID
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    contact.name = req.body.name || contact.name;
    contact.email = req.body.email || contact.email;
    contact.phone = req.body.phone || contact.phone;

    const updatedContact = await contact.save();
    res.json(updatedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a contact by ID
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    await Contact.deleteOne({ _id: req.params.id });
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
