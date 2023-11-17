const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const userMiddleware = require('../middlewares/userMiddleware')
const { authenticate } = require('../middlewares/authMiddleware');

// Get all users
router.get('/', authenticate, userController.getAllUsers)

// Get a single user by ID
router.get('/:id', authenticate, userMiddleware.getUser, userController.getOneUser)

// Create a new user
router.post('/', authenticate, userController.createUser)

// Update a user by ID
router.patch('/:id', authenticate, userMiddleware.getUser, userController.updateUser)

// Delete a user by ID
router.delete('/:id', authenticate, userController.deleteUser)

// Export the router
module.exports = router
