// routes/trainerRoutes.js
const express = require('express');
const {
    registerTrainer,
    loginTrainer,
    getAllTrainers,
    getTrainerById,
    updateTrainer,
    deleteTrainer,
    getClients,
    getClientProgress
} = require('../controllers/trainerController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/register', registerTrainer);
router.post('/login', loginTrainer);
router.get('/', auth(['admin', 'trainer']), getAllTrainers); // Admin and trainers can get all trainers
router.get('/:trainerId', auth(['admin', 'trainer']), getTrainerById); // Admin and trainers can get a trainer by ID
router.put('/:trainerId', auth(['admin']), updateTrainer); // Only admin can update a trainer
router.delete('/:trainerId', auth(['admin']), deleteTrainer); // Only admin can delete a trainer
router.get('/:trainerId/clients', auth(['trainer']), getClients); // Only trainers can get their clients
router.get('/progress/:userId', auth(['trainer']), getClientProgress); // Only trainers can get client progress

module.exports = router;