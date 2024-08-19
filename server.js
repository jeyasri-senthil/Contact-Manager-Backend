const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const contacts = require('./routes/contacts.js');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/contacts', contacts);
app.use(cors()); 

const conn = require('./services/db');
conn.dbConnection();

app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});
