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
        const user = await storedWorkoutRepository.createUserStoredWorkout(req, res)
        res.json(user)
    } catch (err){
        res.json(err)
    }
}

const addUserStoredWorkout = async (req, res) => {
    try {
        const user = await storedWorkoutRepository.addUserStoredWorkout(req)
        res.json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const addStoredWorkoutExercise = async (req, res) => {
    if( req.user._id.toString() === res.storedWorkout.creator.toString()){
        res.json(await storedWorkoutRepository.addExerciseToStoredWorkout(req, res))
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
    getUsersStoredWorkout
}
