const mongoose = require("mongoose");


const tagSchema = new mongoose.Schema({
        _id: {
            type: String,
            required: true,
            alias: "name"
        },
        // name: {
        //     type: String,
        //     required: true,
        //     unique: true
        // },
    }
)

module.exports = mongoose.model('Tag', tagSchema)