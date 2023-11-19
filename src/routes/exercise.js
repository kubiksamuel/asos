const express = require('express')
const router = express.Router()
const exerciseController = require('../controllers/exerciseController')
const { authenticate } = require('../middlewares/authMiddleware');

// Get all exercises
router.get('/', authenticate, exerciseController.getAllExercises)

// Create exercise
router.post('/', authenticate, exerciseController.createExercise)

// Export the router
module.exports = router