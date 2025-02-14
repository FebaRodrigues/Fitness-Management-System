
//routes/payments.js
const express = require('express');
const { processPayment, getPayments, updatePayment } = require('../controllers/paymentController');
const router = express.Router();

router.post('/', processPayment);
router.get('/:userId', getPayments);
router.put('/:transactionId', updatePayment);

module.exports = router;