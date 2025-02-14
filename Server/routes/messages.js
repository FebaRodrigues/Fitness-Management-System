//routes/messages.js
const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController'); // Adjust the path as necessary

const router = express.Router();

// Define the routes
router.post('/', sendMessage); // POST /api/messages
router.get('/:userId/:trainerId', getMessages); // GET /api/messages/:userId/:trainerId

module.exports = router;