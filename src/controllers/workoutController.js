const workoutRepository = require("../repositories/workoutRepository")

const startWorkout = async (req, res) => {
    try {
        res.status(201).json( await workoutRepository.start(req.params.storedWorkoutId, req.user._id) )
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
const completeWorkout = async (req, res) => {
    try{
        const workout = res.workout
        if ( workout.workoutState === 'completed' ){
            throw new Error('Workout is already completed');
        }
        workout.workoutState = 'completed'
        workout.completedAt = new Date()
        workout.duration = (workout.completedAt.getTime() - workout.startedAt.getTime()) / 1000 / 60
        await workout.populate('storedWorkout')
        workout.caloriesBurned = workout.storedWorkout.totalCaloriesBurned

        const completedWorkout = await workoutRepository.save(workout)
        res.status(200).json(completedWorkout)
    }catch (err){
        res.status(500).json({message: err.message})
    }
}

const getAllWorkouts = async (req, res) => {
    try {
        res.json(await workoutRepository.findAllByUser(req))
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getWorkout = async (req, res) => {
    try {
        res.json(await workoutRepository.findWorkout(req.params.workoutId))
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    startWorkout,
    completeWorkout,
    getAllWorkouts,
    getWorkout
}
