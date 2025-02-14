//controllers/workoutProgramController.js
const WorkoutProgram = require('../models/WorkoutProgram');

// Create a new workout program
exports.createWorkoutProgram = async (req, res) => {
    const { trainerId, userId, exercises } = req.body;
    const program = new WorkoutProgram({ trainerId, userId, exercises });
    try {
        await program.save();
        res.status(201).json({ message: 'Workout program created successfully', program });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all workout programs for a user
exports.getWorkoutPrograms = async (req, res) => {
    const { userId } = req.params;
    try {
        const programs = await WorkoutProgram.find({ userId });
        res.status(200).json(programs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};