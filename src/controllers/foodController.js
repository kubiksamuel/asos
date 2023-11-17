const Food = require('../models/food')
const foodRepository = require("../repositories/foodRepository")
const User = require("../models/user");
const mongoose = require("mongoose");
const axios = require('axios');
const foodService = require('../services/foodService')
const jsonMapper = require('../mappers/jsonMapper')
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
        res.status(201).json(newFood)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const addUserFood = async (req, res) => {

    const food = new Food({
        name: req.body.name,
        weight: req.body.weight,
        calories: req.body.calories,
        proteins: req.body.proteins,
        fats: req.body.fats,
        carbs: req.body.carbs,
        dateTime: new Date()
    })
    try {
        await foodRepository.save(food)

        await User.updateOne(
            {_id: res.user.id},
            {$push: {foods: new mongoose.Types.ObjectId(food.id)}}
        )

        // const updateUser = await userRepository.save(res.user)
        // res.status(201).json(updateUser)

        res.status(201).json("Food added to user!")
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

const deleteFoodFromUser = async (req, res) => {

    try {
        await User.updateOne(
            {_id: req.params.id},
            {$pull: {"foods": req.params.foodId}}
        )

        // await userRepository.save(res.user)
        await foodRepository.deleteById(req.params.foodId)

        res.status(200).json({message: 'Deleted food from user'})
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}


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

const getFoodDetails = async (req, res) => {
    const foodId = req.params.foodId
    try{
        const result = await axios.get(`https://api.spoonacular.com/food/products/${foodId}?apiKey=${process.env.API_FOOD_KEY}`)
        const mappedResult = jsonMapper.mapFoodJson(result.data)
        res.json(foodService.calculateFoodNutrition(mappedResult, mappedResult.weight))
    }
    catch (err) {
        res.status(400).json({message: err.message})
    }
}

const createFoodWithApi = async (req, res) => {
    const weight = req.params.weight
    const foodId = req.params.foodId

    try {
        const result = await axios.get(`https://api.spoonacular.com/food/products/${foodId}?apiKey=${process.env.API_FOOD_KEY}`)
        const mappedResult = jsonMapper.mapFoodJson(result.data)
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
        res.status(201).json(newFood)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    getAllFoods,
    getOneFood,
    createFood,
    addUserFood,
    deleteFoodFromUser,
    getFoodFromApi,
    getFoodDetails,
    createFoodWithApi
}