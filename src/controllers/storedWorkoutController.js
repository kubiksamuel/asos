const User = require('../models/user')
const StoredWorkout = require('../models/storedWorkout')
const Exercise = require('../models/exercise')
const CardioExercise = require('../models/cardioExercise')
const StrengthExercise = require('../models/strengthExercise')
const userRepository = require("../repositories/userRepository")
const storedWorkoutRepository = require("../repositories/storedWorkoutRepository")
const mongoose = require("mongoose");

const getUsersStoredWorkouts = async (req, res) => {
    try {
        res.json(await storedWorkoutRepository.findAllByUser(res))
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const addUserStoredWorkout = async (req, res) => {
    try {
        const updatedUser = await storedWorkoutRepository.createUserStoredWorkout(req, res)
        res.json(updatedUser)
    } catch (err){
        res.json(err)
    }
}

const addStoredWorkoutExercise = async (req, res) => {
    if (req.body.type === "cardio"){
        CardioExercise.create(req.body)
            .then(({ _id }) => StoredWorkout.findOneAndUpdate({}, {$push: {exercises: _id}}, {new: true}))
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    } else if (req.body.type === "strength"){
        StrengthExercise.create(req.body)
            .then(({ _id }) => StoredWorkout.findOneAndUpdate({}, {$push: {exercises: _id}}, {new: true}))
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    } else {
        throw new Error("Invalid Workout type.");
    }
}

module.exports = {
    getUsersStoredWorkouts,
    addUserStoredWorkout,
    addStoredWorkoutExercise
}
