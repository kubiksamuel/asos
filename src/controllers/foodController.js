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
    } 

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

module.exports = {
    getAllFoods,
    getOneFood,
    createFood,
    deleteFood,
    getFoodFromApi,
    getFoodDetails,
    createFoodWithApi
}