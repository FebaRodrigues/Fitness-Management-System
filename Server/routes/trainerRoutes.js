// routes/trainerRoutes.js
const express = require('express');
const upload = require('../middleware/multer');
const {
    registerTrainer,
    loginTrainer,
    getAllTrainers,
    getTrainerProfileById,
    updateTrainerProfile,
    deleteTrainer,
    getClients,
    getClientProgress,
    getTrainerEarnings
} = require('../controllers/trainerController');
const auth = require('../middleware/auth');
const router = express.Router();

// Trainer registration
router.post('/register', upload.single('image'), registerTrainer);

// Trainer login
router.post('/login', loginTrainer);

// Get all trainers (admin only)
router.get('/', auth(['admin']), getAllTrainers);

// Get a trainer's profile (admin and trainer)
router.get('/profile/:trainerId', auth(['admin', 'trainer']), getTrainerProfileById);

// Update a trainer's profile (admin and trainer)
// router.put('/profile/:trainerId', auth(['admin', 'trainer']), updateTrainerProfile);

router.put('/profile/:trainerId', auth(['admin', 'trainer']), upload.single('image'), updateTrainerProfile);
// Delete a trainer (admin only)
router.delete('/:trainerId', auth(['admin']), deleteTrainer);

// Get all clients for a trainer (trainer only)
router.get('/:trainerId/clients', auth(['trainer']), getClients);

// Get progress for a specific client (trainer only)
router.get('/progress/:userId', auth(['trainer']), getClientProgress);

// Get trainer earnings (admin and trainer)
router.get('/earnings/:trainerId', auth(['admin', 'trainer']), getTrainerEarnings);

module.exports = router;