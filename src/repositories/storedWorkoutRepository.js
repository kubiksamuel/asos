const StoredWorkout = require('../models/storedWorkout');
const User = require("../models/user");
const mongoose = require("mongoose");

const findAll = () => {
    return StoredWorkout.find()
};

const findById = async (id) => {
    return StoredWorkout.findById(id);
};

const save = async (storedWorkout) => {
    return storedWorkout.save(storedWorkout)
};

const deleteById = async (id) => {
    return StoredWorkout.deleteOne({_id: id})
};

const findStoredWorkout = async (id) => {
    return StoredWorkout.findOne({_id: id})
        .populate('exercises')
        .exec();
};

const findAllByUser = async (req) => {
    return StoredWorkout.find({_id: {$in: req.user.storedWorkouts}});
}

const createUserStoredWorkout = async(req) => {
    const storedWorkout = await StoredWorkout.create({
        name: req.body.name,
        description: req.body.description,
        visibility: req.body.visibility,
        creator: req.user._id
    })
    await User.findOneAndUpdate({_id: new mongoose.Types.ObjectId(req.user._id)}, {$push: {storedWorkouts: storedWorkout._id}}, {new: true})
    return storedWorkout
}

const addUserStoredWorkout = async(req) => {
    User.findOneAndUpdate({_id: new mongoose.Types.ObjectId(req.user._id)}, {$push: {storedWorkouts: req.params.storedWorkoutId}}, {new: true})
}

const findAllVisible = async () => {
    return StoredWorkout.find({visibility: true})
}

const addExerciseToStoredWorkout = async (req) => {
    return StoredWorkout.findOneAndUpdate({_id: new mongoose.Types.ObjectId(req.params.storedWorkoutId)}, {$push: {exercises: req.params.exerciseId}}, {new: true})
}

// ... other CRUD operations

module.exports = {
    findAll,
    findById,
    save,
    deleteById,
    findAllByUser,
    createUserStoredWorkout,
    findAllVisible,
    addUserStoredWorkout,
    addExerciseToStoredWorkout,
    findStoredWorkout
}
