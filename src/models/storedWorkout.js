const mongoose = require('mongoose')

const storedWorkoutSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        exercises: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "exercise"
            }
        ],
        visibility: {
            type: Boolean,
            required: true,
            default: false
        }
    },
)

// total duration of all exercises
storedWorkoutSchema.virtual('totalDuration').get(function (){
    Workout.find({}).populate('exercises')
    let totalDuration = this.exercises.reduce(function(prev, cur) {
        return prev + cur.duration;
    }, 0);
    return totalDuration;
})

const Workout = mongoose.model('StoredWorkout', storedWorkoutSchema)

module.exports = Workout