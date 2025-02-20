//models/Payment.js

const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' }, // pending, completed, failed
    transactionId: { type: String, unique: true }, // Unique transaction ID from payment gateway
});

module.exports = mongoose.model('Payment', paymentSchema);