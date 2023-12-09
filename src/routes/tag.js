const express = require('express')
const router = express.Router()
const tagController = require('../controllers/tagController')
// const { authenticate } = require('../middlewares/authMiddleware');

// Get all tags
router.get('/', tagController.getAllTags)

// Create tag
router.post('/', tagController.createTag)

// Export the router
module.exports = router