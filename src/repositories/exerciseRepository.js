const Exercise = require('../models/exercise');
const CardioExercise = require("../models/cardioExercise");
const StrengthExercise = require("../models/strengthExercise");

const findAll = () => {
    return Exercise.find()
};

const findById = async (id) => {
    return Exercise.findById(id);
};

const save = async (exercise) => {
    return exercise.save(exercise)
};

const deleteById = async (id) => {
    return Exercise.deleteOne({_id: id})
};

const create = async (req) => {
    if (req.body.type === "cardio"){
        return await CardioExercise.create(req.body)

    } else if (req.body.type === "strength"){
        return await StrengthExercise.create(req.body)
    } else {
        throw new Error("Invalid Workout type.");
    }
}

// ... other CRUD operations

module.exports = {
    findAll,
    findById,
    save,
    deleteById,
    create
}
