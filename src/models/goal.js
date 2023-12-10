const mongoose = require('mongoose')
const Tag = require("./tag");

const goalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
      type: String,
      required: true,
    },
    goalState: {
      type: String,
    //   enum: ['completed', 'inProgress', 'notStarted'],        takto alebo
      enum: ['started', 'completed'],
      default: 'started',
      required: true
    },
    completedAt: {
      type: Date,
      default: null
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
  { timestamps: true }
)

module.exports = mongoose.model('Goal', goalSchema)



