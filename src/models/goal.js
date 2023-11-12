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
    goalState: {
      type: String,
    //   enum: ['completed', 'inProgress', 'notStarted'],        takto alebo
      enum: ['started', 'completed'],
      default: 'started',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Goal', goalSchema)



