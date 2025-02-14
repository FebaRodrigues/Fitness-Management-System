//models/Goal.js

const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    goalType: { type: String, required: true }, // e.g., weight loss, muscle gain
    targetValue: { type: Number, required: true },
    currentValue: { type: Number, default: 0 },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Goal', goalSchema);