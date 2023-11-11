const mongoose = require('mongoose')
const {Schema} = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    foods: [
        {
            type: Schema.Types.ObjectId,
            ref: "Food"
        }
    ]
})

module.exports = mongoose.model('User', userSchema)