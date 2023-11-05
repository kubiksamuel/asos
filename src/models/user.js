const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    foods: {
        type: [],
        required: false
    }
})

module.exports = mongoose.model('User', userSchema)