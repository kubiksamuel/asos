const express = require('express')
const router = express.Router()
const recommendationController = require('../controllers/recommendationController')
const { authenticate } = require('../middlewares/authMiddleware');
const goalMiddleware = require('../middlewares/goalMiddleware')

// Get workout recommendations for all goals
router.get('/workout', authenticate,  recommendationController.getWorkoutRecommendationsForAllGoals)

// Get workout recommendations for specific goal
router.get('/workout/goal/:id', authenticate, goalMiddleware.getGoal,  recommendationController.getWorkoutRecommendationsForSpecificGoal)

// Export the router
module.exports = router