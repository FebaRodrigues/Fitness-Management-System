// routes/trainerRoutes.js
const express = require('express');
const upload=require('../middleware/multer')
 
const {
    registerTrainer,
    loginTrainer,
    getAllTrainers,
    getTrainerById,
    updateTrainer,
    deleteTrainer,
    getClients,
    getClientProgress,
    getTrainerEarnings // Ensure this function is imported
} = require('../controllers/trainerController'); // Adjust the path as necessary
const auth = require('../middleware/auth');
const { image } = require('../config/cloudinaryConfig');
const router = express.Router();


// router.post('/register', upload.single('image'), registerTrainer);
router.post('/register',upload.single('image'), registerTrainer)
router.post('/login', loginTrainer);
router.get('/', auth(['admin', 'trainer']), getAllTrainers);
router.get('/:trainerId', auth(['admin', 'trainer']), getTrainerById);
router.put('/:trainerId', auth(['admin']), updateTrainer);
router.delete('/:trainerId', auth(['admin']), deleteTrainer);
router.get('/:trainerId/clients', auth(['trainer']), getClients);
router.get('/progress/:userId', auth(['trainer']), getClientProgress);

module.exports = router;