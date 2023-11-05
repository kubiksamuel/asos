const Food = require('../models/food')
const foodRepository = require("../repositories/foodRepository")

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

module.exports = {
    getAllFoods,
    getOneFood,
    createFood,
}