const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
        startedAt: {
            type: Date,
            default: Date.now()
        },
        completedAt: {
            type: Date,
            default: null
        },
        caloriesBurned: {
            type: Number,
            default: null
        },
        duration: {
            type: Number,
            default: null
        },
        workoutState: {
            type: String,
            enum: ['started', 'completed'],
            default: 'started',
            required: true
        },
        storedWorkout: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "StoredWorkout"
        }
    },
)

module.exports = mongoose.model('Workout', workoutSchema)