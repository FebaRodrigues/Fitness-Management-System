// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', default: null },
  membershipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Membership', default: null },
  amount: { type: Number, required: true },
  type: { 
    type: String, 
    enum: ['Membership', 'TrainerSession'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Completed', 'Failed'], 
    default: 'Completed' 
  },
  paymentDate: { type: Date, default: Date.now },
  transactionId: { type: String },
});

module.exports = mongoose.model('Payment', paymentSchema);