const User = require('../models/user')
const Food = require('../models/food')
const userRepository = require("../repositories/userRepository")
const foodRepository = require("../repositories/foodRepository")

const getAllUsers = async (req, res) => {
    try {
        const users = await userRepository.findAll()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getOneUser = (req, res) => {
    res.json(res.user)
}

const createUser = async (req, res) => {
    const user = new User({
        name: req.body.name,
        username: req.body.username
    })
    try {
        const newUser = await userRepository.save(user)
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const updateUser = async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.username != null) {
        res.user.username = req.body.username
    }
    try {
        const updatedUser = await userRepository.save(res.user)
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        await userRepository.deleteById(req.params.id)
        res.json({ message: 'Deleted user' })
    } catch (err) {
        res.status(500).json({ message: err.message })
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
        dateTime: new Date(),
        userId: req.params.id
    })
    try {
        const updateFood = await foodRepository.save(food)
        // res.user.foods.push(food)
        // const updateUser = await userRepository.save(res.user)
        res.status(201).json(updateFood)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const deleteFoodFromUser = async (req, res) => {

    try {
        console.log(req.params.id)
        console.log(res.food.userId)
        if (req.params.id === res.food.userId.toString()){
            await foodRepository.deleteById(req.params.foodId)
            res.status(500).json({ message: 'Deleted food from user' })
        }
        else {
            res.status(401).json({ message: 'Unauthorized ' })
        }

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addUserFood,
    deleteFoodFromUser
}
