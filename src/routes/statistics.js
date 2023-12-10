const express = require('express')
const router = express.Router()
const statisticsController = require('../controllers/statisticsController')
const { authenticate } = require('../middlewares/authMiddleware');

// Get all tags
router.get('/', authenticate, statisticsController.getCaloriesStatistics)

// Create tag
// router.post('/', statisticsController.createTag)

// Export the router
module.exports = router