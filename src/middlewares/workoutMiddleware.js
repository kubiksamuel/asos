const workoutRepository = require("../repositories/workoutRepository")

const getWorkout = async (req, res, next) => {
    let workout
    try {
        workout = await workoutRepository.findById(req.params.workoutId)
        if (workout == null) {
            return res.status(404).json({ message: 'Cannot find workout' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.workout = workout
    next()
}

module.exports = {
    getWorkout
}
