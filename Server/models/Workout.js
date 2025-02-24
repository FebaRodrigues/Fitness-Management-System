//models/Workout.js
const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User ", required: true },
    category: { 
        type: String, 
        enum: ["Strength", "Cardio", "Flexibility", "Endurance"], 
        required: true 
    },
    exercises: [
        {
            name: { type: String, required: true },
            sets: { type: Number, default: null },
            reps: { type: Number, default: null },
            weight: { type: Number, default: null },
            duration: { type: Number, default: null },
            distance: { type: Number, default: null }
        }
    ],
    date: { type: Date, default: Date.now },
    notes: { type: String, default: "" }
});

// Pre-save validation to ensure exercises are valid based on category
workoutSchema.pre('validate', function(next) {
    const category = this.category;
    this.exercises.forEach(exercise => {
        if (category === 'Strength' && (!exercise.sets || !exercise.reps)) {
            this.invalidate('exercises', 'Strength exercises require sets and reps');
        }
        if (category === 'Cardio' && !exercise.duration) {
            this.invalidate('exercises', 'Cardio exercises require duration');
        }
    });
    next();
});

module.exports = mongoose.model("Workout", workoutSchema);