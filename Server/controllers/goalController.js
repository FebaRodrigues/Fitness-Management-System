//controllers/goalController.js

const Goal = require('../models/Goal');

// Set a new goal
exports.setGoal = async (req, res) => {
    const { userId, goalType, targetValue, endDate } = req.body;
    const goal = new Goal({ userId, goalType, targetValue, endDate });
    try {
        await goal.save();
        res.status(201).json({ message: 'Goal set successfully', goal });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all goals for a user
exports.getGoals = async (req, res) => {
    const { userId } = req.params;
    try {
        const goals = await Goal.find({ userId });
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update current value of a goal
exports.updateGoalProgress = async (req, res) => {
    const { goalId, currentValue } = req.body;
    try {
        const goal = await Goal.findByIdAndUpdate(goalId, { currentValue }, { new: true });
        if (!goal) return res.status(404).json({ message: 'Goal not found' });
        res.status(200).json(goal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};