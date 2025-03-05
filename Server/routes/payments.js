// routes/payments.js
const express = require('express');
const { 
  createPayment, 
  getUserPayments, 
  getTrainerPayments, 
  updatePaymentStatus, 
  getAllPayments, 
  handleStripeWebhook,
  sendPaymentOTP,
  verifyPaymentOTP 
} = require('../controllers/paymentController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth(['user']), createPayment);
router.get('/user/:userId', auth(['user']), getUserPayments);
router.get('/trainer/:trainerId', auth(['trainer']), getTrainerPayments);
router.put('/:paymentId', auth(['user', 'trainer']), updatePaymentStatus);
router.get('/all', auth(['admin']), getAllPayments);
router.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);
router.post('/send-otp', auth(['user']), sendPaymentOTP);
router.post('/verify-otp', auth(['user']), verifyPaymentOTP);

module.exports = router;