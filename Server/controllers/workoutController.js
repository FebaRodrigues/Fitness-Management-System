// controllers/workoutController.js

const Workout = require("../models/Workout");

// Create Workout
exports.createWorkout = async (req, res) => {
    try {
        const { userId, category, exercises, date, notes } = req.body;

        if (!userId || !category || !Array.isArray(exercises) || exercises.length === 0) {
            return res.status(400).json({ error: "Missing required fields: userId, category, and exercises" });
        }

        const workout = new Workout({
            userId,
            category,
            exercises,
            date: date || Date.now(),
            notes: notes || ""
        });

        await workout.save();
        res.status(201).json(workout);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                error: 'Validation Error',
                details: error.errors
            });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get Workouts for a User
// controllers/workoutController.js
exports.getWorkouts = async (req, res) => {
    try {
        const { userId } = req.params;
        const workouts = await Workout.find({ userId }).sort({ date: -1 });
        res.status(200).json(workouts);
    } catch (error) {
        console.error("Error fetching workouts:", error); // Log the error for debugging
        res.status(500).json({ error: "Internal Server Error" });
    }
};

