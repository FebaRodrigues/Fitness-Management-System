//models/Dispute.js
const mongoose = require('mongoose');

const disputeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'open' } // open, resolved, closed
});

module.exports = mongoose.model('Dispute', disputeSchema);
