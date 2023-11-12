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

const findAllByUser = async (res) => {
    return StoredWorkout.find({_id: {$in: res.user.storedWorkouts}});
}

const createUserStoredWorkout = async(req, res) => {
    const { _id } = await StoredWorkout.create(req.body)
    return User.findOneAndUpdate({_id: new mongoose.Types.ObjectId(res.user._id)}, {$push: {storedWorkouts: _id}}, {new: true})
}

// ... other CRUD operations

module.exports = {
    findAll,
    findById,
    save,
    deleteById,
    findAllByUser,
    createUserStoredWorkout
}
