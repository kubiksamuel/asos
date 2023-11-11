const goalRepository = require("../repositories/goalRepository")

const getGoal = async (req, res, next) => {
    let goal
    try {
        goal = await goalRepository.findById(req.params.id)
        if (goal == null) {
            return res.status(404).json({ message: 'Cannot find goal' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.goal = goal
    next()
}

module.exports = {
    getGoal
}
