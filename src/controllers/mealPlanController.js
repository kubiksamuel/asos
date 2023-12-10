const mealPlanRepository = require("../repositories/mealPlanRepository")
require('dotenv').config()
const axios = require('axios');
 
const getMealPlan = async (req, res) => {

   try {
        const userId = req.user.id
        const { week, year } = req.query // Access query parameters

        // You can now use `week` and `year` to filter the meal plans if they are provided
        const query = { user: userId }
        if (week) query.weekNumber = week
        if (year) query.year = year

        const mealPlans = await mealPlanRepository.find(query)
        
        res.json(mealPlans)
    } catch (error) {
            res.status(500).send(error.message)
    }

}

const createMealPlan = async (req, res) => {
    try {
        const user = req.user
        const mealPlanData = req.body
        mealPlanData.user = user.id
        const mealPlan = await mealPlanRepository.save(mealPlanData)

        res.status(201).json(mealPlan)
    } catch (error) {
        res.status(500).send(error.message)
    }
}


const generateMealPlan = async (req, res) => {
    const weightGoal = req.query.weightGoal;
    const activityLevel = req.query.activityLevel;
    const user = req.user
    try {
        let caloriesNeeded = calculateCalories(user.gender, user.weight, user.height, user.age, activityLevel, weightGoal);
        console.log(caloriesNeeded)
        const result = await axios.get(`https://api.spoonacular.com/mealplanner/generate?targetCalories=${caloriesNeeded}&apiKey=${process.env.API_FOOD_KEY}`)
        res.status(200).json(result.data)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}



function calculateCalories(gender, weight, height, age, activityLevel, goal) {
    let bmr;

    if (gender === "male") {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (gender === "female") {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    } else {
        return "Invalid gender";
    }

    const activityLevelMapping = {
        "sedentary": 1.2, // Little or no exercise
        "lightly_active": 1.375, // Light exercise or sports 1-3 days a week
        "moderately_active": 1.55, // Moderate exercise or sports 3-5 days a week
        "very_active": 1.725, // Hard exercise or sports 6-7 days a week
        "extra_active": 1.9 // Very hard exercise, sports, or a physical job
    };

    let maintenanceCalories = bmr * activityLevelMapping[activityLevel];

    switch (goal) {
        case "lose":
            return maintenanceCalories - 500; // For losing weight
        case "gain":
            return maintenanceCalories + 500; // For gaining weight
        case "maintain":
            return maintenanceCalories; // For maintaining weight
        default:
            return "Invalid goal";
    }
}

module.exports = {
    getMealPlan, 
    createMealPlan,
    generateMealPlan
}