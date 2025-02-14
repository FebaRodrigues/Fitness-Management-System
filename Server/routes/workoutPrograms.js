//routes/workoutPrograms.js

const express = require('express');
const { createWorkoutProgram, getWorkoutPrograms } = require('../controllers/workoutProgramController'); // Adjust the path as necessary

const router = express.Router();

// Define the routes
router.post('/', createWorkoutProgram); // POST /api/workout-programs
router.get('/:userId', getWorkoutPrograms); // GET /api/workout-programs/:userId

module.exports = router;