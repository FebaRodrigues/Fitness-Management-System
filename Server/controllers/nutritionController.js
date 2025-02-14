
//controllers/nutritionController.js
const Nutrition = require('../models/Nutrition');

// Log nutrition
exports.logNutrition = async (req, res) => {
    const { userId, meals } = req.body;
    const nutrition = new Nutrition({ userId, meals });
    try {
        await nutrition.save();
        res.status(201).json({ message: 'Nutrition logged successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get nutrition for a user
exports.getNutrition = async (req, res) => {
    const { userId } = req.params;
    try {
        const nutrition = await Nutrition.find({ userId });
        res.status(200).json(nutrition);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};