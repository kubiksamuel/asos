const mongoose = require('mongoose')

// 2 types of exercises: strength or cardio
const options = { discriminatorKey: 'type' }

const exerciseSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        duration: {
            type: Number,
            required: true,
        },
    },
    options
)

module.exports = mongoose.model('Exercise', exerciseSchema)