const express = require('express');
const { check, validationResult } = require('express-validator');
const Service = require('../models/service'); // Update the path as per your directory structure

const router = express.Router();

// Create a new service
router.post(
  '/',
  [
    check('name', 'Service name is required').not().isEmpty(),
    // Add more validators as needed
  ],
  async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newService = new Service({ ...req.body });
      await newService.save();
      res.json(newService);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Get all services for a specific provider
router.get('/provider/:providerId', async (req, res) => {
  try {
    const services = await Service.find({ providerId: req.params.providerId });
    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a service
router.put('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).send('Service not found');

    // Update fields
    // ...

    await service.save();
    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a service
router.delete('/:id', async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Service removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/random', async (req, res) => {
    try {
      // Fetch 20 random services and populate provider details
      const services = await Service.find().populate('providerId', 'name').limit(20);
      res.json(services);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

module.exports = router;

router.get('/homepage-services/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch the user's role
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    let services;
    if (user.role === 'provider') {
      // Fetch 5 random services offered by this provider
      services = await Service.aggregate([
        { $match: { providerId: user._id } },
        { $sample: { size: 5 } }
      ]);
    } else {
      // Fetch 5 random services from any provider
      services = await Service.aggregate([
        { $sample: { size: 5 } }
      ]);
    }

    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
