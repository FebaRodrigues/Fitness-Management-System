//models/WorkoutProgram.js
const mongoose = require('mongoose');

const workoutProgramSchema = new mongoose.Schema({
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    exercises: [{
        name: { type: String, required: true },
        sets: { type: Number, required: true },
        reps: { type: Number, required: true },
        notes: { type: String, default: '' },
    }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WorkoutProgram', workoutProgramSchema);