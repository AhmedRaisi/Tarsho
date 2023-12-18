// Import necessary modules
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Import the User model
require('dotenv').config(); // Load environment variables from .env file

// Create a new Router instance
const router = express.Router();

// Export the router
module.exports = router;
