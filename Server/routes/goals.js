// routes/goals.js
const express = require('express');
const { 
    createGoal, 
    getUserGoals, 
    updateGoal, 
    deleteGoal, 
    updateProgress, 
    getAllUserGoals,
    linkWorkoutToGoal 
} = require('../controllers/goalController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth(['user']), createGoal);
router.get('/:userId', auth(['user']), getUserGoals);
router.get('/all/:userId', auth(['user']), getAllUserGoals);
router.put('/:goalId', auth(['user']), updateGoal);
router.delete('/:goalId', auth(['user']), deleteGoal);
router.put('/progress/:goalId', auth(['user']), updateProgress);
router.post('/link-workout', auth(['user']), linkWorkoutToGoal);

module.exports = router;