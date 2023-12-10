const express = require('express')
const { authenticate } = require('../middlewares/authMiddleware')
const mealPlanController = require('../controllers/mealPlanController');

const router = express.Router()

router.get('/', authenticate, mealPlanController.getMealPlan);
router.post('/', authenticate, mealPlanController.createMealPlan);

module.exports = router;
