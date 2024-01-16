const express = require('express');
const router = express.Router();
const FeedBackModel = require('./models/Feedback');

router.get('/feedbacks', async (req, res) => {
  try {
    const feedbacks = await FeedBackModel.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/feedbacks', async (req, res) => {
  try {
    const { name, description, rating } = req.body;

    if (!name || !description || !rating) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newFeedback = new FeedBackModel({
      name,
      description,
      rating,  
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;