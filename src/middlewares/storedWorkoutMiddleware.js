const storedWorkoutRepository = require("../repositories/storedWorkoutRepository")

const getStoredWorkout = async (req, res, next) => {
    let storedWorkout
    try {
        storedWorkout = await storedWorkoutRepository.findById(req.params.storedWorkoutId)
        if (storedWorkout == null) {
            return res.status(404).json({ message: 'Cannot find storedWorkout' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.storedWorkout = storedWorkout
    next()
}

module.exports = {
    getStoredWorkout
}
