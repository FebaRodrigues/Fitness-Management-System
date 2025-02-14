//routes/goals.js
const express = require('express');
const { setGoal, getGoals, updateGoalProgress } = require('../controllers/goalController'); // Adjust the path as necessary

const router = express.Router();

// Define the routes
router.post('/', setGoal); // POST /api/goals
router.get('/:userId', getGoals); // GET /api/goals/:userId
router.put('/update', updateGoalProgress); // PUT /api/goals/update

module.exports = router;