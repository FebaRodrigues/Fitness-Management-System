// routes/notifications.js
const express = require('express');
const { 
  createNotification, 
  getNotifications, 
  markNotificationAsRead 
} = require('../controllers/notificationController');
const auth = require('../middleware/auth');
const router = express.Router();

// Create a notification (Admin or System)
router.post('/', auth(['admin']), createNotification);

// Get notifications for a user or trainer
router.get('/:recipientId', auth(['user', 'trainer']), getNotifications);

// Mark notification as read
router.put('/:notificationId', auth(['user', 'trainer']), markNotificationAsRead);

module.exports = router;