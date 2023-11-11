const Goal = require('../models/goal')
const goalRepository = require("../repositories/goalRepository")

const getAllGoals = async (req, res) => {
    try {
        const goals = await goalRepository.findAll()
        res.json(goals)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getOneGoal = (req, res) => {
    res.json(res.goal)
}

const createGoal = async (req, res) => {
    const goal = new Goal({
        name: req.body.name,
        description: req.body.description,
        goal_state: 'started'
    })
    try {
        const newGoal = await goalRepository.save(goal)
        res.status(201).json(newGoal)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const updateGoal = async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.description != null) {
        res.user.description = req.body.description
    }
    try {
        const updatedGoal = await goalRepository.save(res.goal)
        res.json(updatedGoal)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const deleteGoal = async (req, res) => {
    try {
        await goalRepository.deleteById(req.params.id)
        res.json({ message: 'Deleted goal' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getAllGoals,
    getOneGoal,
    createGoal,
    updateGoal,
    deleteGoal
}
