//models/Workout.js
const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    exercises: [{
        name: { type: String, required: true },
        sets: { type: Number, required: true },
        reps: { type: Number, required: true },
        weight: { type: Number, required: true },
    }],
    date: { type: Date, default: Date.now },
    notes: { type: String, default: '' },
});

module.exports = mongoose.model('Workout', workoutSchema);