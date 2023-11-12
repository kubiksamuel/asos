const express = require('express')
const router = express.Router()
const storedWorkoutController = require('../controllers/storedWorkoutController')
const { authenticate } = require('../middlewares/authMiddleware');
const userMiddleware = require("../middlewares/userMiddleware");
const storedWorkoutMiddleware = require("../middlewares/storedWorkoutMiddleware")

router.get('/users/:id', authenticate, userMiddleware.getUser, storedWorkoutController.getUsersStoredWorkouts)

router.post('/users/:id', authenticate, userMiddleware.getUser, storedWorkoutController.addUserStoredWorkout)

router.put('/:storedWorkoutId/users/:id/',  authenticate, userMiddleware.getUser,storedWorkoutMiddleware.getStoredWorkout, storedWorkoutController.addStoredWorkoutExercise)

// Export the router
module.exports = router