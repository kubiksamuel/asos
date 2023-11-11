const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
      type: String,
      required: true,
    },
    goal_state: {
      type: String,
    //   enum: ['completed', 'inProgress', 'notStarted'],        takto alebo
      enum: ['started', 'completed'],
      default: 'notStarted',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Goal', goalSchema)



