
// //models/nutrition.js
// const mongoose = require('mongoose');

// const nutritionSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     meals: [{
//         name: { type: String, required: true },
//         calories: { type: Number, required: true },
//         date: { type: Date, default: Date.now },
//     }],
// });

// module.exports = mongoose.model('Nutrition', nutritionSchema);