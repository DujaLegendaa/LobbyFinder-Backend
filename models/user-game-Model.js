const mongoose = require('mongoose')

const userGameSchema = new mongoose.Schema({
    _idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:[true,"idUser not passed"]
    },
    _idGame: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required:[true, "idGame not passed"]
    },
    gamename: {
        type: String,
        required: [true, "username not passed"],
        unique: true
    },
    server: {
        type: String,
        required: [true, "server not passed"]
    },
    platform: {
        type: String,
        enum: ['PC', 'Playstation', 'Xbox', 'Mobile'],
        default: 'PC',
        required: [true, "platform not passed"]
    }
})

const UserGame = mongoose.model('UserGame', userGameSchema)

module.exports = UserGame