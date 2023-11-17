const express = require('express')
const router = express.Router()
const storedWorkoutController = require('../controllers/storedWorkoutController')
const { authenticate } = require('../middlewares/authMiddleware');
const storedWorkoutMiddleware = require("../middlewares/storedWorkoutMiddleware")
const exerciseMiddleware = require("../middlewares/exerciseMiddleware")

router.get('/visible', authenticate, storedWorkoutController.getVisibleStoredWorkouts)

router.get('/', authenticate, storedWorkoutController.getUsersStoredWorkouts)

router.post('/', authenticate, storedWorkoutController.createUserStoredWorkout)

router.put('/:storedWorkoutId', authenticate, storedWorkoutMiddleware.getStoredWorkout, storedWorkoutController.addUserStoredWorkout)

router.get('/:storedWorkoutId', authenticate, storedWorkoutMiddleware.getStoredWorkout, storedWorkoutController.getUsersStoredWorkout)

router.put('/:storedWorkoutId/exercise/:exerciseId/',  authenticate, storedWorkoutMiddleware.getStoredWorkout, exerciseMiddleware.getExercise,  storedWorkoutController.addStoredWorkoutExercise)

// Export the router
module.exports = router