const mongoose = require('mongoose')

const lobbySchema = new mongoose.Schema({
    _idUser: {
        type: mongoose.Schema.Types.ObjectId,
        required:[true,"idUser not passed"]
    },
    _idGame: {
        type: mongoose.Schema.Types.objectId,
        required:[true, "idGame not passed"]
    },
    totalNumberOfMembers: {
        type: Number,
        required:[true,"totalNumberOfMembers not passed"]
    },
    filledNumber: {
        type: Number,
        required:[true,"filledNumbers not passed"],
        default:true
    },
    players: {
        type: [mongoose.Schema.Types.ObjectId],
        required:[true,"players not passed"]
    }    
})

const Lobby = mongoose.model('Lobby', lobbySchema)

module.exports = Lobby