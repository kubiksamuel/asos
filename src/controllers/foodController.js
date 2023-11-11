const Food = require('../models/food')
const foodRepository = require("../repositories/foodRepository")
const User = require("../models/user");
const mongoose = require("mongoose");

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
        quantity: req.body.quantity,
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
        quantity: req.body.quantity,
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

module.exports = {
    getAllFoods,
    getOneFood,
    createFood,
    addUserFood,
    deleteFoodFromUser
}