// models/WorkoutProgram.js
const mongoose = require('mongoose');

const workoutProgramSchema = new mongoose.Schema({
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', default: null },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    isLibraryPlan: { type: Boolean, default: false },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    exercises: [{
        name: { type: String, required: true },
        sets: { type: Number, required: true },
        reps: { type: Number, required: true },
        weight: { type: Number, default: null },
        duration: { type: Number, default: null },
        notes: { type: String, default: '' },
    }],
    category: { 
        type: String, 
        enum: ["Strength", "Cardio", "Flexibility", "Endurance"], 
        required: true 
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WorkoutProgram', workoutProgramSchema);