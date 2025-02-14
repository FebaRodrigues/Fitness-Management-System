//routes/workouts.js
const express = require('express');
const { recordWorkout, getWorkouts, getAllWorkouts } = require('../controllers/workoutController');
const router = express.Router();

router.post('/', recordWorkout);
router.get('/:userId', getWorkouts);
router.get('/all/:userId', getAllWorkouts); // Get all workouts for a user

module.exports = router;