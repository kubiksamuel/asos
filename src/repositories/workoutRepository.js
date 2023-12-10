const Workout = require('../models/workout');
const mongoose = require("mongoose");
const User = require("../models/user");

const findAll = () => {
    return Workout.find()
};

const findAllByUser = async (req) => {
    return Workout.find({_id: {$in: req.user.workouts}});
}

const findById = async (id) => {
    return Workout.findById(id);
};

const findWorkout = async (id) => {
    return Workout.findOne({_id: id})
        .populate({
            path: 'storedWorkout',
            populate: {
                path: 'exercises',
                model: "Exercise"
            }
        })
        .exec();
};

const save = async (workout) => {
    return workout.save(workout)
};

const deleteById = async (id) => {
    return Workout.deleteOne({_id: id})
};

const start = async (storedWorkoutId, userId) => {
    const workout =  await Workout.create({
        storedWorkout: new mongoose.Types.ObjectId(storedWorkoutId)
    })
    await User.findOneAndUpdate({_id: new mongoose.Types.ObjectId(userId)}, {$push: {workouts: workout._id}}, {new: true})
    return workout
}


const getCaloriesStatistics = async (req) => {
    const lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - req.query.days);

    const workouts = await Workout.find({
        _id: { $in: req.user.workouts },
        workoutState: "completed",
        completedAt: { $gte: lastDay, $lt: new Date() }
    });
    return workouts
}

// ... other CRUD operations

module.exports = {
    findAll,
    findById,
    save,
    deleteById,
    start,
    findAllByUser,
    findWorkout,
    getCaloriesStatistics
}
