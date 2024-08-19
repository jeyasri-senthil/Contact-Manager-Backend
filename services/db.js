const mongoose = require('mongoose');
require('dotenv').config();


async function dbConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected...!");
    } catch (err) {
        console.log(err);
    }
}

module.exports = { dbConnection };
