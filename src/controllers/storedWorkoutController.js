const storedWorkoutRepository = require("../repositories/storedWorkoutRepository")

const getVisibleStoredWorkouts = async (req, res) => {
    try{
        res.json(await storedWorkoutRepository.findAllVisible())
    }catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getUsersStoredWorkout = async (req, res) => {
    try {
        res.json(await storedWorkoutRepository.findStoredWorkout(req.params.storedWorkoutId))
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getUsersStoredWorkouts = async (req, res) => {
    try {
        res.json(await storedWorkoutRepository.findAllByUser(req))
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const createUserStoredWorkout = async (req, res) => {
    try {
        const storedWorkout = await storedWorkoutRepository.createUserStoredWorkout(req, res)
        res.status(201).json(
            storedWorkout
        )
    } catch (err){
        res.status(500).json({ message: err.message })
    }
}

const addUserStoredWorkout = async (req, res) => {
    try {
        await storedWorkoutRepository.addUserStoredWorkout(req)
        res.status(200).json()
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const addStoredWorkoutExercise = async (req, res) => {
    if( req.user._id.toString() === res.storedWorkout.creator.toString()){
        const storedWorkout = await storedWorkoutRepository.addExerciseToStoredWorkout(req, res)

        storedWorkout.totalDuration = await storedWorkout.toObject({ virtuals: true }).totalDurationVirtual
        await storedWorkoutRepository.save(storedWorkout)

        storedWorkout.totalCaloriesBurned = await storedWorkout.toObject({ virtuals: true }).totalCaloriesVirtual
        await storedWorkoutRepository.save(storedWorkout)
        res.json(
            storedWorkout
        )
    }else{
        res.status(403).json({message: "Don`t have privilege"})
    }
}

const deleteStoredWorkoutExercise = async (req, res) => {
    if( req.user._id.toString() === res.storedWorkout.creator.toString()){
        res.json(await storedWorkoutRepository.deleteExerciseFromStoredWorkout(req, res))
    }else{
        res.status(403).json({message: "Don`t have privilege"})
    }
}

module.exports = {
    getVisibleStoredWorkouts,
    getUsersStoredWorkouts,
    createUserStoredWorkout,
    addStoredWorkoutExercise,
    addUserStoredWorkout,
    getUsersStoredWorkout,
    deleteStoredWorkoutExercise
}
