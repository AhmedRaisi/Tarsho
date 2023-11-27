const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

// Define your routes here

module.exports = router;

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieves a list of users
 *     description: Optional extended description in Markdown.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user ID.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The user's name.
 *                     example: John Doe
 */

router.get('/users', async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find().select('-password'); // Exclude password from the results

    // Send response with the list of users
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Registration Endpoint
router.post('/register', async (req, res) => {
  try {
    // Check if user already exists
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user
    user = new User({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    // Save the user
    await user.save();

    // Send response (Consider sending a JWT token here as well)
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// Login Endpoint
router.post('/login', async (req, res) => {
  try {
    // Check if user exists
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Create and send token
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Ensure you have a JWT_SECRET in your .env file
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
