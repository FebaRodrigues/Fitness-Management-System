// routes/users.js
const express = require('express');
const upload = require('../middleware/multer');
const {
    register,
    login,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getConfirmedAppointments  
} = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/register', upload.single('image'), register);
router.post('/login', login);
router.get('/', auth(['admin']), getAllUsers);
router.get('/:userId', auth(['admin']), getUserById);
router.get('/profile', auth(['user']), getUserById);
router.put('/profile', auth(['user']), upload.single('image'), updateUser); 
router.delete('/:userId', auth(['admin']), deleteUser);
router.get('/:userId/confirmed-appointments', auth(['user']), getConfirmedAppointments);

module.exports = router;