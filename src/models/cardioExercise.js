const mongoose = require('mongoose')
const Exercise = require("./exercise")

// const cardioExerciseSchema = new mongoose.Schema({
//         distance: {
//             type: Number,
//             required: true,
//             min: 0
//         }
//     },
//     Exercise.options
// )

// const cardioExercise = Exercise.discriminator('cardio', cardioExerciseSchema)

const cardioExerciseSchema = Exercise.discriminator('cardio', new mongoose.Schema({
    distance: {
        type: Number,
        required: true,
        min: 0
    }
}))

module.exports = cardioExerciseSchema