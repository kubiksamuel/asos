const express = require('express')
const router = express.Router()
const foodController = require('../controllers/foodController')
const foodMiddleware = require('../middlewares/foodMiddleware')
const userMiddleware = require('../middlewares/userMiddleware')
const { authenticate } = require('../middlewares/authMiddleware')


// Get all foods
router.get('/', foodController.getAllFoods)

// Get a single food by ID
router.get('/:foodId', foodMiddleware.getFood, foodController.getOneFood)

// Create a new food
router.post('/', foodController.createFood)

//  Add food to user by ID
router.post("/users/:id", userMiddleware.getUser, foodController.addUserFood)

// Delete food from user by ID
router.delete('/:foodId/users/:id', foodMiddleware.getFood, userMiddleware.getUser, foodController.deleteFoodFromUser)

// Get all foods based on their name from spoonacular API
router.get('/api/find', foodController.getFoodFromApi)

// Get detailed info about food (found by Id) from spoonacular API
router.get('/api/find/:foodId', foodController.getFoodDetails)

// Create new food record by id from spoonacular API and weight of the food. Assign it to user that created the request
router.post('/api/:foodId/calculate/:weight', authenticate, foodController.createFoodWithApi)

// Export the router
module.exports = router
