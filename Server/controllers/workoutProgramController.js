// controllers/workoutProgramController.js
const WorkoutProgram = require('../models/WorkoutProgram');

// Create a new workout program (Trainer or Admin)
exports.createWorkoutProgram = async (req, res) => {
    const { title, description, exercises, category, isLibraryPlan } = req.body;
    const trainerId = req.user.role === 'trainer' ? req.user.id : null; // Only set trainerId for trainers

    try {
        const program = new WorkoutProgram({
            trainerId,
            title,
            description,
            exercises,
            category,
            isLibraryPlan: isLibraryPlan || false, // Default to false if not specified
        });
        await program.save();
        res.status(201).json({ message: 'Workout program created successfully', program });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all workout programs for a user (includes assigned and library plans they’ve selected)
exports.getWorkoutPrograms = async (req, res) => {
    const { userId } = req.params;
    try {
        const assignedPrograms = await WorkoutProgram.find({ userId });
        res.status(200).json(assignedPrograms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all library workout programs (accessible to all users)
exports.getLibraryWorkoutPrograms = async (req, res) => {
    try {
        console.log('Fetching library workout programs...');
        const libraryPrograms = await WorkoutProgram.find({ isLibraryPlan: true });
        console.log('Library programs retrieved:', libraryPrograms);
        res.status(200).json(libraryPrograms);
    } catch (error) {
        console.error('Error in getLibraryWorkoutPrograms:', error.stack);
        res.status(500).json({ error: error.message });
    }
};

// Assign a workout program to a user (Trainer only)
exports.assignWorkoutProgram = async (req, res) => {
    const { programId, userId } = req.body;
    const trainerId = req.user.id;

    try {
        const program = await WorkoutProgram.findById(programId);
        if (!program) return res.status(404).json({ message: 'Workout program not found' });

        // Clone the program for the user
        const assignedProgram = new WorkoutProgram({
            trainerId,
            userId,
            title: program.title,
            description: program.description,
            exercises: program.exercises,
            category: program.category,
            isLibraryPlan: false, // Assigned plans are not library plans
        });
        await assignedProgram.save();
        res.status(200).json({ message: 'Workout program assigned successfully', assignedProgram });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};