// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const contacts = require('./routes/contacts');


dotenv.config();

const app = express();
app.use(express.json());


app.use('/api/contacts',contacts);
const PORT = process.env.PORT || 5000;

const conn = require('./services/db');
conn.dbConnection();

// // MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/contactmanager', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// mongoose.connection.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Routes
// const contactRoutes = require('./routes/contacts');
// app.use('/api/contacts', contactRoutes);

app.listen(4000, () => {
  console.log(`Server is running on port ${PORT}`);
});
