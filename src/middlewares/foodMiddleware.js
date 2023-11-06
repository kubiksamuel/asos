const foodRepository = require("../repositories/foodRepository")

const getFood = async (req, res, next) => {
    let food
    try {
        food = await foodRepository.findById(req.params.foodId)
        if (food == null) {
            return res.status(404).json({ message: 'Cannot find food' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.food = food
    next()
}

module.exports = {
    getFood
}
