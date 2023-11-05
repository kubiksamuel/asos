const express = require('express')
const router = express.Router()
const foodController = require('../controllers/foodController')
const foodMiddleware = require('../middlewares/foodMiddleware')

// Get all foods
router.get('/', foodController.getAllFoods)

// Get a single food by ID
router.get('/:id', foodMiddleware.getFood, foodController.getOneFood)

// Create a new food
router.post('/', foodController.createFood)

// // Update a food by ID
// router.patch('/:id', foodMiddleware.getUser, foodController.updateUser)
//
// // Delete a food by ID
// router.delete('/:id', foodController.deleteUser)

// Export the router
module.exports = router
