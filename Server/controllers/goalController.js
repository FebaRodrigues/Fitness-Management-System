const Goal = require("../models/Goal");

// Create a goal
exports.setGoal = async (req, res) => {
  try {
    const goal = await Goal.create(req.body);
    res.status(201).json({ success: true, message: "Goal set successfully", goal });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all goals
exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.params.userId });
    res.status(200).json({ success: true, goals });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update goal progress
exports.updateGoalProgress = async (req, res) => {
  try {
    const { goalId, currentValue } = req.body;
    const goal = await Goal.findById(goalId);
    if (!goal) return res.status(404).json({ success: false, message: "Goal not found" });

    goal.currentValue = currentValue;
    goal.status = currentValue >= goal.targetValue ? "Completed" : "Pending";
    await goal.save();

    res.status(200).json({ success: true, goal });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a goal
exports.deleteGoal = async (req, res) => {
  try {
    await Goal.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Goal deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
