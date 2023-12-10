const Food = require('../models/food')
const foodRepository = require("../repositories/foodRepository")
const User = require("../models/user");
const mongoose = require("mongoose");
const axios = require('axios');
const foodService = require('../services/foodService')
const jsonMapper = require('../mappers/jsonMapper')
const userRepository = require('../repositories/userRepository')
require('dotenv').config()


const getAllFoods = async (req, res) => {
    try {
        const foods = await foodRepository.findAll()
        res.json(foods)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getOneFood = (req, res) => {
    res.json(res.food)
}

const createFood = async (req, res) => {
    const user = req.user
    const food = new Food({
        name: req.body.name,
        weight: req.body.weight,
        calories: req.body.calories,
        proteins: req.body.proteins,
        fats: req.body.fats,
        carbs: req.body.carbs,
        dateTime: new Date(),
    })
    try {
        const newFood = await foodRepository.save(food)
        user.foods.push(newFood)
        await userRepository.save(user)
        res.status(201).json(newFood)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const deleteFood = async (req, res) => {
    const user = req.user 
    const foodId = req.params.foodId

    // check if this user have this food in his foods array
    if (!user.foods.includes(foodId)) {
        res.status(400).json({ message: "This user does not have this food" })
    } else {
        try {
            const index = user.foods.indexOf(foodId);
            // delete food
            await foodRepository.deleteById(foodId)
            user.foods.splice(index, 1);
            await userRepository.save(user)
            res.status(200).json({message: 'Deleted food from user'})
        } catch (err) {
            res.status(400).json({message: err.message})
        }
    }
}

// get all foods from spoonacular API based on their name
const getFoodFromApi = async (req, res) => {
    const foodTitle = req.query.foodTitle 
    try{
        const results = await axios.get(`https://api.spoonacular.com/food/products/search?query=${foodTitle}&apiKey=${process.env.API_FOOD_KEY}`)
        res.json(results.data)
    }
    catch (err) {
        res.status(400).json({message: err.message})
    }
}

// get all details about food found by id from spoonacular API
const getFoodDetails = async (req, res) => {
    const foodId = req.params.foodId
    try{
        const result = await axios.get(`https://api.spoonacular.com/food/products/${foodId}?apiKey=${process.env.API_FOOD_KEY}`)
        // adapt json to desired json
        const mappedResult = jsonMapper.mapFoodJson(result.data)
        // calculate nutrition values based on weight and return response
        res.json(foodService.calculateFoodNutrition(mappedResult, mappedResult.weight))
    }
    catch (err) {
        res.status(400).json({message: err.message})
    }
}

// create food record based on id from spoonacular API and assign it to user
const createFoodWithApi = async (req, res) => {
    const weight = req.params.weight
    const foodId = req.params.foodId
    const user = req.user
    try {
        const result = await axios.get(`https://api.spoonacular.com/food/products/${foodId}?apiKey=${process.env.API_FOOD_KEY}`)
        // adapt json to desired json
        const mappedResult = jsonMapper.mapFoodJson(result.data)
        // calculate nutrition values based on weight
        const calculatedResult = foodService.calculateFoodNutrition(mappedResult, weight)

        const food = new Food({
            name: calculatedResult.name,
            weight: calculatedResult.weight,
            calories: calculatedResult.calories,
            proteins: calculatedResult.proteins,
            fats: calculatedResult.fats,
            carbs: calculatedResult.carbs,
            dateTime: new Date(),
        })
        const newFood = await foodRepository.save(food)

        user.foods.push(newFood.id)
        await userRepository.save(user)

        res.status(201).json(newFood)
    } catch (err) {
        res.status(400).json({ message: err.message })
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


const createRecipeWithApi = async (req, res) => {
    const foodId = req.params.foodId
    const user = req.user
    const servings = req.query.servings
    try {
        const result = await axios.get(`https://api.spoonacular.com/recipes/${foodId}/information?includeNutrition=true&apiKey=${process.env.API_FOOD_KEY}`)
        // adapt json to desired json
        const mappedResult = jsonMapper.mapRecipeJson(result.data, servings)
    
        const food = new Food({
            name: mappedResult.name,
            servings: mappedResult.servings,
            calories: mappedResult.calories,
            proteins: mappedResult.proteins,
            fats: mappedResult.fats,
            carbs: mappedResult.carbs,
            dateTime: new Date(),
        })
        const newFood = await foodRepository.save(food)

        user.foods.push(newFood.id)
        await userRepository.save(user)

        res.status(201).json(mappedResult)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}



module.exports = {
    getAllFoods,
    getOneFood,
    createFood,
    deleteFood,
    getFoodFromApi,
    getFoodDetails,
    createFoodWithApi,
    generateMealPlan,
    createRecipeWithApi
}