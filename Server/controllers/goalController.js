// controllers/goalController.js
const Goal = require('../models/Goal');
const User = require('../models/User');
const Notification = require('../models/Notification');

exports.createGoal = async (req, res) => {
    const { goalType, currentValue, targetValue, deadline, notes, milestones, workouts } = req.body;
    const userId = req.user.id;

    try {
        const goal = new Goal({
            userId,
            goalType,
            currentValue,
            targetValue,
            deadline,
            notes,
            milestones: milestones || [],
            workouts: workouts || [],
        });
        await goal.save();

        // Notify user
        await Notification.create({
            recipientId: userId,
            recipientModel: 'User',
            type: 'Goal',
            message: `New goal "${goalType}" created with target ${targetValue}.`,
            status: 'Unread',
        });

        res.status(201).json({ message: 'Goal created successfully', goal });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserGoals = async (req, res) => {
    const { userId } = req.params;
    const status = req.query.status || 'active'; // Default to active goals
    try {
        const goals = await Goal.find({ userId, status }).populate('workouts', 'title');
        res.status(200).json({ goals });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllUserGoals = async (req, res) => {
    const { userId } = req.params;
    try {
        const goals = await Goal.find({ userId }).populate('workouts', 'title');
        res.status(200).json({ goals });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateGoal = async (req, res) => {
    const { goalId } = req.params;
    const updates = req.body;

    try {
        const goal = await Goal.findById(goalId);
        if (!goal) return res.status(404).json({ message: 'Goal not found' });
        if (goal.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

        Object.assign(goal, updates, { updatedAt: new Date() });
        await goal.save();
        res.status(200).json({ message: 'Goal updated successfully', goal });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteGoal = async (req, res) => {
    const { goalId } = req.params;

    try {
        const goal = await Goal.findById(goalId);
        if (!goal) return res.status(404).json({ message: 'Goal not found' });
        if (goal.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

        goal.status = 'deleted';
        await goal.save();
        res.status(200).json({ message: 'Goal marked as deleted', goal });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProgress = async (req, res) => {
    const { goalId } = req.params;
    const { currentValue, milestoneId } = req.body;

    try {
        const goal = await Goal.findById(goalId);
        if (!goal) return res.status(404).json({ message: 'Goal not found' });
        if (goal.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

        if (currentValue !== undefined) {
            goal.currentValue = currentValue;
            goal.progress = Math.min(100, Math.round((currentValue / goal.targetValue) * 100));
            if (goal.progress >= 100) goal.status = 'completed';
        }

        if (milestoneId) {
            const milestone = goal.milestones.id(milestoneId);
            if (!milestone) return res.status(404).json({ message: 'Milestone not found' });
            milestone.completed = true;
            milestone.completedAt = new Date();
        }

        await goal.save();

        if (goal.status === 'completed') {
            await Notification.create({
                recipientId: goal.userId,
                recipientModel: 'User',
                type: 'Goal',
                message: `Congratulations! You've completed your "${goal.goalType}" goal!`,
                status: 'Unread',
            });
        }

        res.status(200).json({ message: 'Progress updated', goal });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.linkWorkoutToGoal = async (req, res) => {
    const { goalId, workoutId } = req.body;

    try {
        const goal = await Goal.findById(goalId);
        if (!goal) return res.status(404).json({ message: 'Goal not found' });
        if (goal.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

        if (!goal.workouts.includes(workoutId)) {
            goal.workouts.push(workoutId);
            await goal.save();
        }

        res.status(200).json({ message: 'Workout linked to goal', goal });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};