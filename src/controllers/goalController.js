const Goal = require('../models/goal')
const goalRepository = require("../repositories/goalRepository")
const userRepository = require("../repositories/userRepository")

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
    const user = req.user
    const goal = new Goal({
        name: req.body.name,
        description: req.body.description,
        goal_state: 'started'
    })
    try {
        const newGoal = await goalRepository.save(goal)
        // add goal id into user
        user.goals.push(newGoal.id)
        await userRepository.save(user)
        res.status(201).json(newGoal)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const updateGoal = async (req, res) => {
    if (req.body.name != null) {
        res.goal.name = req.body.name
    }
    if (req.body.description != null) {
        res.goal.description = req.body.description
    }
    try {
        const updatedGoal = await goalRepository.save(res.goal)
        res.json(updatedGoal)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const deleteGoal = async (req, res) => {
    const user = req.user
    const goalId = req.params.id

    if (!user.goals.includes(goalId)) {
        res.status(400).json({ message: "This user does not have this goal" })
    } 
    try {
        const index = user.goals.indexOf(goalId);

        await goalRepository.deleteById(goalId)
        user.goals.splice(index, 1)
        await userRepository.save(user)
        res.json({ message: 'Deleted goal' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const completeGoal = async (req, res) => {
    res.goal.goalState = 'completed'
    try {
        res.goal.completedAt = new Date()
        const completedGoal = await goalRepository.save(res.goal)
        res.json(completedGoal)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    getAllGoals,
    getOneGoal,
    createGoal,
    updateGoal,
    deleteGoal,
    completeGoal
}
