// models/Contact.js

const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
    unique: true,
  },
  phone: {
    type: String,
    // required: true,
  },
});

const temp =  mongoose.model('Contact', ContactSchema);

module.exports = temp;
