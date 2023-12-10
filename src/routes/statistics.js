const express = require('express')
const router = express.Router()
const statisticsController = require('../controllers/statisticsController')
const { authenticate } = require('../middlewares/authMiddleware');

// Get calories burned from last N(params: days) days
router.get('/', authenticate, statisticsController.getCaloriesStatistics)

// Export the router
module.exports = router