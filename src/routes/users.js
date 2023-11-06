const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const userMiddleware = require('../middlewares/userMiddleware')
const foodMiddleware = require('../middlewares/foodMiddleware')

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

// router.get("/:id/foods", userController.getAllUserFoods)

//  Add food to user by ID
router.post("/:id/foods", userMiddleware.getUser, userController.addUserFood)

// Delete food from user by ID
router.delete('/:id/foods/:foodId', userMiddleware.getUser, foodMiddleware.getFood, userController.deleteFoodFromUser)

// Export the router
module.exports = router
