const factory = require('./handlerFactory')
const Game = require('./../models/gameModel')

exports.getAllGames = factory.getAll(Game)

exports.getGame =  factory.getOne(Game)

exports.createGame = factory.createOne(Game)

exports.updateGame = factory.updateOne(Game)

exports.deleteGame = factory.deleteOne(Game)