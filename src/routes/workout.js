const express = require('express')
const router = express.Router()
const workoutController = require('../controllers/workoutController')
const { authenticate } = require('../middlewares/authMiddleware');
const storedWorkoutMiddleware = require("../middlewares/storedWorkoutMiddleware")
const workoutMiddleware = require("../middlewares/workoutMiddleware")

// Start a new workout
router.post('/storedWorkout/:storedWorkoutId', authenticate, storedWorkoutMiddleware.getStoredWorkout, workoutController.startWorkout)

// Complete an existing workout
router.patch('/complete/:workoutId', authenticate, workoutMiddleware.getWorkout, workoutController.completeWorkout)

// Get user's workouts
router.get('/', authenticate, workoutController.getAllWorkouts)

// Get user's workout
router.get('/:workoutId', authenticate, workoutMiddleware.getWorkout, workoutController.getWorkout)

// Export the router
module.exports = router