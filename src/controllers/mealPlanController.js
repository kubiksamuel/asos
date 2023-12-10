const mealPlanRepository = require("../repositories/mealPlanRepository")
require('dotenv').config()
 
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
        const mealPlanData = req.body
        const mealPlan = await mealPlanRepository.save(mealPlanData)

        res.status(201).json(mealPlan)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    getMealPlan, 
    createMealPlan
}