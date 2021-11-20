const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"name not passed"],
        unique: true
    },
    description: {
        type: String,
        required: [true, "description not passed"]
    }
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game