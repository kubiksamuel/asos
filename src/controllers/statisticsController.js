const workoutRepository = require("../repositories/workoutRepository")

const getCaloriesStatistics = async (req, res) => {
    try {
        res.json(await workoutRepository.getCaloriesStatistics(req))
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


module.exports = {
    getCaloriesStatistics
}
