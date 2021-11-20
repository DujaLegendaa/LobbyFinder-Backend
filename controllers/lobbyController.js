const factory = require('./handlerFactory')
const Lobby = require('./../models/lobbyModel')
const AppError = require('../utils/AppError')
const User = require('./../models/userModel')

exports.getAllLobbies = factory.getAll(Lobby)

exports.getLobby =  factory.getOne(Lobby)

exports.createLobby = factory.createOne(Lobby)

exports.updateLobby = factory.updateOne(Lobby)

exports.deleteLobby = factory.deleteOne(Lobby)

exports.joinLobby = catchAsync(async (req, res, next) => {
    if(!req.query.hasOwnProperty('userID') || !req.query.hasOwnProperty('lobbyID'))
        return next(new AppError('User or lobby field not provided'), 400)

    // Check if lobby exist and if it is full
    const lobby = await Lobby.findById(req.query.lobbyID)
    if(!lobby)
        return next(new AppError('Lobby does not exist', 400))
    if(lobby.isFull())
        return next(new AppError('Lobby is already full', 400))
    
    // Check if the user exists
    const userExists = await User.findById(req.query.userID)
    if(!userExists)
        return next(new AppError('User does not exist', 400))

    // Check if user is already in that lobby
    if(lobby.players.includes(req.query.userID))
        return next(new AppError('User is already in that lobby', 400))
     
    // Push user and save
    lobby.players.push(req.query.userID)
    lobby.save()

    res.status(200).json({
        status: 'success',
        data: {lobby}
    })
    // const lobby = await Lobby.findById(req.params.id)

    // if(!doc)
    //     return next(new AppError(`No document found with id ${req.params.id}`, 404))
})