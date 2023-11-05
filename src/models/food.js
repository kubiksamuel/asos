const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    proteins: {
        type: Number,
        required: true
    },
    fats: {
        type: Number,
        required: true
    },
    carbs: {
        type: Number,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    },
})

module.exports = mongoose.model('Food', foodSchema)