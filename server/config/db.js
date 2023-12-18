const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbURI = 'mongodb://mongodb:27017/usersdb';
    await mongoose.connect(dbURI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;

