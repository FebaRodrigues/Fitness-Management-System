// controllers/workoutLogController.js
const WorkoutLog = require('../models/WorkoutLog');

exports.createWorkoutLog = async (req, res) => {
    const { userId, workoutId, exercises, caloriesBurned } = req.body;

    try {
        // Validate required fields
        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }
        if (!exercises || !Array.isArray(exercises) || exercises.length === 0) {
            return res.status(400).json({ error: 'At least one exercise is required' });
        }

        // Construct log data
        const logData = {
            userId,
            exercises: exercises.map(ex => ({
                name: ex.name,
                setsCompleted: ex.setsCompleted || 0,
                repsCompleted: ex.repsCompleted || 0,
                weight: ex.weight || 0,
            })),
            caloriesBurned: caloriesBurned || 0,
        };

        // Only include workoutId if provided and non-empty
        if (workoutId && workoutId.trim() !== '') {
            logData.workoutId = workoutId;
        }

        const log = new WorkoutLog(logData);
        await log.save();
        res.status(201).json(log);
    } catch (error) {
        console.error('Error creating workout log:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.getWorkoutLogs = async (req, res) => {
    const { userId } = req.params;
    try {
        const logs = await WorkoutLog.find({ userId }).populate('workoutId', 'title');
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};