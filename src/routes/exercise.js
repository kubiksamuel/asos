const express = require('express')
const router = express.Router()
const exerciseController = require('../controllers/exerciseController')
const { authenticate } = require('../middlewares/authMiddleware');

router.get('/', authenticate, exerciseController.getAllExercises)

router.post('/', authenticate, exerciseController.createExercise)

// Export the router
module.exports = router