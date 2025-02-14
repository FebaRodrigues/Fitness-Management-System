// routes/admin.js
const express = require('express');
const { 
    manageUsers, 
    approveTrainer, 
    registerUser , 
    loginAdmin, 
    getAllTrainersForAdmin, 
    getTrainerByIdForAdmin,
    getUserActivity,
    createUserActivity // Ensure this is imported
} = require('../controllers/adminController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/register', registerUser );
router.post('/login', loginAdmin);
router.get('/users', auth, manageUsers);
router.post('/approve-trainer', auth, approveTrainer);
router.get('/trainers', auth, getAllTrainersForAdmin); // Get all trainers for admin
router.get('/trainers/:trainerId', auth, getTrainerByIdForAdmin); 
router.get('/user-activity/:id', auth, getUserActivity); // Get user activity by user ID
router.post('/user-activity', createUserActivity); // Create user activity

module.exports = router;