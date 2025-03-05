// routes/workoutPrograms.js
const express = require('express');
const { 
    createWorkoutProgram, 
    getWorkoutPrograms, 
    getLibraryWorkoutPrograms, 
    assignWorkoutProgram 
} = require('../controllers/workoutProgramController');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a workout program (Trainer or Admin)
router.post('/', auth(['trainer', 'admin']), createWorkoutProgram);

// Get all library workout programs (accessible to all users)
router.get('/library', getLibraryWorkoutPrograms); // Moved ABOVE /:userId

// Get all workout programs for a user (User or Trainer)
router.get('/:userId', auth(['user', 'trainer']), getWorkoutPrograms);

// Assign a workout program to a user (Trainer only)
router.post('/assign', auth(['trainer']), assignWorkoutProgram);

module.exports = router;