//routes/workouts.js
const express = require("express");
const { createWorkout, getWorkouts } = require("../controllers/workoutController");

const router = express.Router();

// Create a workout
router.post("/", createWorkout);

// Get workouts for a user
router.get("/user/:userId", getWorkouts);

module.exports = router;

