const mongoose = require('mongoose')
const Exercise = require("./exercise")

const strengthExerciseSchema = Exercise.discriminator('strength', new mongoose.Schema({
    reps: {
        type: Number,
        required: true,
        min: 0
    },
    sets: {
        type: Number,
        required: true,
        min: 0
    },
    weight: {
        type: Number,
        min: 0
    }
}))

module.exports = strengthExerciseSchema