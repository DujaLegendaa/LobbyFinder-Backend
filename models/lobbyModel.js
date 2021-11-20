const mongoose = require('mongoose')

const lobbySchema = new mongoose.Schema({
    _idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:[true,"idUser not passed"]
    },
    _idGame: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: [true, "idGame not passed"]
    },
    maxNumberOfPlayers: {
        type: Number,
        required: [true,"maxNumberOfPlayers not passed"]
    },
    players: {
        type: [mongoose.Schema.Types.ObjectId],
        validate: {
            validator: function(playersArr) {
                if (!playersArr.includes(this._idUser))
                    return playersArr.length + 1 < this.maxNumberOfPlayers
                return playersArr.length < this.maxNumberOfPlayers // Create full lobbies ?!?!
            },
            message: 'Lobby has too many players'
        },
        ref: 'User',
    }    
})

lobbySchema.virtual('numPlayers').get(function () {
    return this.players.length
})

lobbySchema.virtual('openSpots').get(function () {
    return this.maxNumberOfPlayers - this.numPlayers
})

lobbySchema.methods.isFull = function() {
    return this.openSpots == 0
}

lobbySchema.methods.isOver = function() {
    return this.openSpots < 0
}

lobbySchema.pre('save', function(next) {
    if(!this.players.includes(this._idUser))
        this.players.push(this._idUser)
    
    next()
})



const Lobby = mongoose.model('Lobby', lobbySchema)

module.exports = Lobby