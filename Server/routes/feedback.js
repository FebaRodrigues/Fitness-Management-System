//routes/feedback.js

const express = require('express');
const { submitFeedback, getFeedbackForTrainer } = require('../controllers/feedbackController');
const router = express.Router();

router.post('/', submitFeedback); // Submit feedback
router.get('/:trainerId', getFeedbackForTrainer); // Get feedback for a trainer

module.exports = router;
