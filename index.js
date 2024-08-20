const mongoose = require('mongoose');
const dotenv = require('dotenv');
const createExpressApp = require('./express');
dotenv.config();

const app = createExpressApp();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
};

startServer();
