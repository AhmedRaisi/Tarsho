const express = require('express');
const Review = require('../models/review'); // Update the path as per your directory structure

const router = express.Router();

// Create a new review
router.post('/', async (req, res) => {
  try {
    const newReview = new Review({ ...req.body });
    await newReview.save();
    res.json(newReview);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get reviews for a specific service
router.get('/service/:serviceId', async (req, res) => {
  try {
    const reviews = await Review.find({ serviceId: req.params.serviceId });
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a review
router.put('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).send('Review not found');

    // Update fields
    // ...

    await review.save();
    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a review
router.delete('/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Review removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
