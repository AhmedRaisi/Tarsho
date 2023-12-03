// Import necessary modules
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Import the User model
require('dotenv').config(); // Load environment variables from .env file

// Create a new Router instance
const router = express.Router();

/**
 * @openapi
 * /register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [client, provider]
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/register', async (req, res) => {
  try {
    // Check if a user with the given username already exists
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      // If user exists, return a 400 error
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user with the provided data
    user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email, 
      role: req.body.role 
    });

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    // Save the new user to the database
    await user.save();

    // Create a JWT payload with the user's ID
    const payload = {
      user: {
        id: user.id
      }
    };

    // Sign a JWT token with the payload
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Use the secret from the .env file
      { expiresIn: 3600 }, // Set the token to expire in 3600 seconds (1 hour)
      (err, token) => {
        if (err) throw err;
        // Respond with the token
        res.json({ token });
      }
    );
  } catch (err) {
    // Log errors and send a 500 server error response
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *       - Users
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', async (req, res) => {
  try {
    // Attempt to find the user by username
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      // If user is not found, return an error
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      // If the password doesn't match, return an error
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Create a JWT payload including the user's role and ID
    const payload = {
      user: {
        id: user.id,
        role: user.role 
      }
    };

    // Sign a JWT token with the payload
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Use the secret from the .env file
      { expiresIn: 3600 }, // Set the token to expire in 3600 seconds (1 hour)
      (err, token) => {
        if (err) throw err;
        // Respond with the token and user details
        res.json({ 
          token,
          role: user.role,
          userId: user.id,
          name: user.name
        });
      }
    );
  } catch (err) {
    // Log errors and send a 500 server error response
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/**
 * @openapi
 * /profile/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile data
 *       404:
 *         description: User not found
 */
router.get('/profile/:id', async (req, res) => {
  try {
    // Find the user by ID, excluding the password
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      // If user is not found, return a 404 error
      return res.status(404).send('User not found');
    }
    // Send the user data as response
    res.json(user);
  } catch (err) {
    // Log errors and send a 500 server error response
    res.status(500).send('Server error');
  }
});

/**
 * @openapi
 * /profile/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update user profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               contactNumber:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: User profile updated
 *       404:
 *         description: User not found
 */
router.put('/profile/:id', async (req, res) => {
  try {
    // Destructure the fields from the request body
    const { name, email, contactNumber, address } = req.body;

    // Find the user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      // If user is not found, return a 404 error
      return res.status(404).send('User not found');
    }

    // Update fields if they are provided in the request
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (contactNumber !== undefined) user.contactNumber = contactNumber;
    if (address !== undefined) user.address = address;

    // Save the updated user
    await user.save();
    // Send the updated user data as response
    res.json(user);
  } catch (err) {
    // Log errors and send a 500 server error response
    res.status(500).send('Server error');
  }
});

/**
 * @openapi
 * /random-users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Fetch two random users
 *     responses:
 *       200:
 *         description: A list of two random users
 *       500:
 *         description: Server error
 */
router.get('/random-users', async (req, res) => {
  try {
    // Find and return two random users
    const randomUsers = await User.find().limit(2);
    res.json(randomUsers);
  } catch (err) {
    // Log errors and send a 500 server error response
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Export the router
module.exports = router;
