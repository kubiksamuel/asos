const User = require('../models/user')
const userRepository = require("../repositories/userRepository")

const getAllUsers = async (req, res) => {
    try {
        const users = await userRepository.findAll()
        const usersWithoutPasswords = users.map(user => {
            const { password, ...userWithoutPassword } = user.toObject()
            return userWithoutPassword
        })
        res.json(usersWithoutPasswords)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getOneUser = (req, res) => {
    const { password, ...userWithoutPassword } = res.user.toObject();
    res.json(userWithoutPassword);
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
        res.status(400).json({message: err.message})
    }
}

const updateUser = async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.username != null) {
        res.user.username = req.body.username
    }
    if (req.body.age != null) {
        res.user.age = req.body.age
    }
    if (req.body.gender != null) {
        res.user.gender = req.body.gender
    }
    if (req.body.height != null) {
        res.user.height = req.body.height
    }
    if (req.body.weight != null) {
        res.user.weight = req.body.weight
    }
    try {
        const updatedUser = await userRepository.save(res.user)
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

const deleteUser = async (req, res) => {
    try {
        await userRepository.deleteById(req.params.id)
        res.json({message: 'Deleted user'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
}
