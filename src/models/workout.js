const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
        day: {
            type: Date,
            default: Date.now()
        },
        exercises: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "exercise"
            }
        ]
    },
)

module.exports = mongoose.model('Workout', workoutSchema)