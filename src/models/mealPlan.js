const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    id: Number,
    imageType: String,
    title: String,
    readyInMinutes: Number,
    servings: Number,
    sourceUrl: String
});

const dailyPlanSchema = new mongoose.Schema({
    meals: [mealSchema],
    nutrients: {
        calories: Number,
        protein: Number,
        fat: Number,
        carbohydrates: Number
    }
});

const mealPlanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    weekNumber: Number,  // e.g., 1 to 52
    year: Number,        // e.g., 2023
    week: {
        monday: dailyPlanSchema,
        tuesday: dailyPlanSchema,
        wednesday: dailyPlanSchema,
        thursday: dailyPlanSchema,
        friday: dailyPlanSchema,
        saturday: dailyPlanSchema,
        sunday: dailyPlanSchema
    }
});

mealPlanSchema.index({ user: 1, weekNumber: 1, year: 1 }, { unique: true });

module.exports = mongoose.model('MealPlan', mealPlanSchema);
