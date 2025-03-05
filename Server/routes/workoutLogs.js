// routes/workoutLogs.js
const express = require('express');
const { createWorkoutLog, getWorkoutLogs } = require('../controllers/workoutLogController');
const router = express.Router();
router.post('/', createWorkoutLog);
router.get('/:userId', getWorkoutLogs);
module.exports = router;