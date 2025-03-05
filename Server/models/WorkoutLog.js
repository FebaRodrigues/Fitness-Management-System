// models/WorkoutLog.js
const mongoose = require('mongoose');

const workoutLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    workoutId: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutProgram', required: false }, // Make optional
    date: { type: Date, default: Date.now },
    exercises: [{
        name: String,
        setsCompleted: Number,
        repsCompleted: Number,
        weight: Number,
    }],
    caloriesBurned: { type: Number },
});

module.exports = mongoose.model('WorkoutLog', workoutLogSchema);