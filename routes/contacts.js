// routes/contacts.js

const express = require('express');
const router = express.Router();
const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/contactController');

// Define routes and attach controller methods
router.get('/getall', getAllContacts);
router.get('/:id', getContactById);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;
