const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true }, // Removed extra space
    recommendations: { type: Array, required: true }, // Array of recommendations
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recommendation', recommendationSchema);