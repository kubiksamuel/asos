const mongoose = require('mongoose')
const Exercise = require("./exercise")

const strengthExerciseSchema = new mongoose.Schema({
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
    },
    Exercise.options
)

const strengthExercise = Exercise.discriminator('strength', strengthExerciseSchema)

module.exports = mongoose.model('StrengthExercise', strengthExerciseSchema)