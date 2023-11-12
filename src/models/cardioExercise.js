const mongoose = require('mongoose')
const Exercise = require("./exercise")

const cardioExerciseSchema = new mongoose.Schema({
        distance: {
            type: Number,
            required: true,
            min: 0
        }
    },
    Exercise.options
)

const cardioExercise = Exercise.discriminator('cardio', cardioExerciseSchema)

module.exports = mongoose.model('CardioExercise', cardioExerciseSchema)