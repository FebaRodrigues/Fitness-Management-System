//models/Goal.js

const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  goalType: { type: String, required: true },
  targetValue: { type: Number, required: true },
  currentValue: { type: Number, default: 0 },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

// Automatically update status
goalSchema.pre("save", function (next) {
  this.status = this.currentValue >= this.targetValue ? "Completed" : "Pending";
  next();
});

module.exports = mongoose.model("Goal", goalSchema);
