const express = require('express')
const router = express.Router()
const storedWorkoutController = require('../controllers/storedWorkoutController')
const { authenticate } = require('../middlewares/authMiddleware');
const storedWorkoutMiddleware = require("../middlewares/storedWorkoutMiddleware")
const exerciseMiddleware = require("../middlewares/exerciseMiddleware")

// Get visible stored workouts
router.get('/visible', authenticate, storedWorkoutController.getVisibleStoredWorkouts)

// Get user's stored workouts
router.get('/', authenticate, storedWorkoutController.getUsersStoredWorkouts)

// Create a new stored workout for user
router.post('/', authenticate, storedWorkoutController.createUserStoredWorkout)

// Add stored workout to user
router.put('/:storedWorkoutId', authenticate, storedWorkoutMiddleware.getStoredWorkout, storedWorkoutController.addUserStoredWorkout)

// Get user's stored workout
router.get('/:storedWorkoutId', authenticate, storedWorkoutMiddleware.getStoredWorkout, storedWorkoutController.getUsersStoredWorkout)

// Add an exercise to stored workout
router.put('/:storedWorkoutId/exercise/:exerciseId/',  authenticate, storedWorkoutMiddleware.getStoredWorkout, exerciseMiddleware.getExercise,  storedWorkoutController.addStoredWorkoutExercise)

// Delete exercise from stored workout
router.delete('/:storedWorkoutId/exercise/:exerciseId/',  authenticate, storedWorkoutMiddleware.getStoredWorkout, exerciseMiddleware.getExercise,  storedWorkoutController.deleteStoredWorkoutExercise)

// Export the router
module.exports = router