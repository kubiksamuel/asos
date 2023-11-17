const express = require('express')
const router = express.Router()
const foodController = require('../controllers/foodController')
const foodMiddleware = require('../middlewares/foodMiddleware')
const userMiddleware = require('../middlewares/userMiddleware')

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

router.get('/api/find', foodController.getFoodFromApi)

router.get('/api/find/:foodId', foodController.getFoodDetails)

router.post('/api/:foodId/calculate/:weight', foodController.createFoodWithApi)

// Export the router
module.exports = router
