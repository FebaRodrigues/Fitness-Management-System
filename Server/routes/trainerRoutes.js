//routes/trainerRoutes.js
const express = require('express');
const {
    registerTrainer,
    loginTrainer,
    getAllTrainers,
    getTrainerById,
    updateTrainer,
    deleteTrainer,
    getClients, getClientProgress
} = require('../controllers/trainerController');
const auth = require('../middleware/auth');
const router = express.Router();

// Register a new trainer
router.post('/register', registerTrainer);

// Login trainer
router.post('/login', loginTrainer); // Add this line for login

// Protected routes for trainers
router.get('/', auth, getAllTrainers); // Get all trainers
router.get('/:trainerId', auth, getTrainerById); // Get a trainer by ID
router.put('/:trainerId', auth, updateTrainer); // Update a trainer
router.delete('/:trainerId', auth, deleteTrainer); // Delete a trainer
router.get('/:trainerId/clients', getClients); // GET /api/trainers/:trainerId/clients
router.get('/progress/:userId', getClientProgress)


module.exports = router;