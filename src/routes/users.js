const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const userMiddleware = require('../middlewares/userMiddleware')

// Get all users
router.get('/', userController.getAllUsers)

// Get a single user by ID
router.get('/:id', userMiddleware.getUser, userController.getOneUser)

// Create a new user
router.post('/', userController.createUser)

// Update a user by ID
router.patch('/:id', userMiddleware.getUser, userController.updateUser)

// Delete a user by ID
router.delete('/:id', userMiddleware.getUser, userController.deleteUser)

// Export the router
module.exports = router
