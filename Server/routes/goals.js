const express = require("express");
const { setGoal, getGoals, updateGoalProgress, deleteGoal } = require("../controllers/goalController");

const router = express.Router();

router.post("/", setGoal);
router.get("/:userId", getGoals);
router.put("/update", updateGoalProgress);
router.delete("/:id", deleteGoal);

module.exports = router;
