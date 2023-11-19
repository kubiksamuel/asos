const exerciseRepository = require("../repositories/exerciseRepository")

const getExercise = async (req, res, next) => {
    let exercise
    try {
        exercise = await exerciseRepository.findById(req.params.exerciseId)
        if (exercise == null) {
            return res.status(404).json({ message: 'Cannot find exercise' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.exercise = exercise
    next()
}

module.exports = {
    getExercise
}