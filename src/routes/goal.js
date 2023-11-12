const express = require('express')
const router = express.Router()
const goalController = require('../controllers/goalController')
const goalMiddleware = require('../middlewares/goalMiddleware')
const { authenticate } = require('../middlewares/authMiddleware')

// Get all goals
router.get('/', authenticate, goalController.getAllGoals)

// Get a single goal by ID
router.get('/:id', authenticate, goalMiddleware.getGoal, goalController.getOneGoal)

// Create a new goal
router.post('/', authenticate, goalController.createGoal)

// Complete state of a goal by ID
router.patch('/complete/:id', authenticate, goalMiddleware.getGoal, goalController.completeGoal)

// Update a goal by ID
router.patch('/:id', authenticate, goalMiddleware.getGoal, goalController.updateGoal)

// Delete a goal by ID
router.delete('/:id', authenticate, goalController.deleteGoal)

// Export the router
module.exports = router
