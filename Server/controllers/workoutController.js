// controllers/workoutController.js

const Workout = require('../models/Workout');

// Record a workout
exports.recordWorkout = async (req, res) => {
    const { userId, exercises } = req.body;
    const workout = new Workout({ userId, exercises });
    try {
        await workout.save();
        res.status(201).json({ message: 'Workout recorded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get workouts for a user
exports.getWorkouts = async (req, res) => {
    const { userId } = req.params;
    try {
        const workouts = await Workout.find({ userId });
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all workouts for a user
exports.getAllWorkouts = async (req, res) => {
    const { userId } = req.params;
    try {
        const workouts = await Workout.find({ userId });
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};