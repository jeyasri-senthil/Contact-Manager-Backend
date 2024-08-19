const mongoose = require('mongoose');
const Contact = require('../models/Contact');

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({success: true, data: contacts});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
    
  }
};

exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    const { name, email, phone } = req.body;
    if (name && typeof name !== 'string') return res.status(400).json({ message: 'Invalid name' });
    if (email && !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ message: 'Invalid email format' });
    if (phone && typeof phone !== 'string') return res.status(400).json({ message: 'Invalid phone number' });

    contact.name = name || contact.name;
    contact.email = email || contact.email;
    contact.phone = phone || contact.phone;

    const updatedContact = await contact.save();
    res.json(updatedContact);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: 'Internal server error' });
  }
};


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
