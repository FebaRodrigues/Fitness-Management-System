//controllers/feedbackController.js

const Feedback = require('../models/Feedback');

// Submit feedback for a trainer
exports.submitFeedback = async (req, res) => {
    const { userId, trainerId, rating, comment } = req.body;

    const feedback = new Feedback({ userId, trainerId, rating, comment });
    try {
        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get feedback for a trainer
exports.getFeedbackForTrainer = async (req, res) => {
    const { trainerId } = req.params;
    try {
        const feedback = await Feedback.find({ trainerId });
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};