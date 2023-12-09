const mongoose = require('mongoose')
const Tag = require("./tag.js")

const opts = {  toJSON: { virtuals: true }  };
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
                ref: "Exercise"
            }
        ],
        visibility: {
            type: Boolean,
            required: true,
            default: false
        },
        creator: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        tags: {
            type: [
                {
                    type: mongoose.Schema.Types.String,
                    ref: 'Tag'
                }
            ],
            validate: {
                validator: async function (tags) {
                    if (!tags || tags.length === 0) {
                        throw new Error("At least one tag is required.")
                    }
                    const existingTags = await Tag.find({_id: {$in: tags}});
                    if(existingTags.length !== tags.length)
                    {
                        throw new Error("Some tags do not exist.")
                    }
                },
                message: 'Validation failed.'
            }
        }
    },
    opts
)

const Workout = mongoose.model('StoredWorkout', storedWorkoutSchema)

module.exports = Workout

// total duration of all exercises
storedWorkoutSchema.virtual('totalDuration').get(async function (){
    await this.populate('exercises')
    let totalDuration = this.exercises.reduce(function(prev, cur) {
        return prev + cur.duration;
    }, 0);
    return totalDuration;
})