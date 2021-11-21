const factory = require('./handlerFactory')
const Lobby = require('./../models/lobbyModel')
const AppError = require('../utils/AppError')
const User = require('./../models/userModel')
const catchAsync = require('../utils/catchAsync')

exports.getAllLobbies = factory.getAll(Lobby)

exports.getLobby =  factory.getOne(Lobby)

exports.createLobby = catchAsync(async (req, res, next) => {
    req.body._idUser = req.user.id
    const newDoc = await Lobby.create(req.body)
    res.status(201).json({
        status: 'success',
        data: {newDoc}
    })
})

exports.updateLobby = factory.updateOne(Lobby)

exports.deleteLobby = factory.deleteOne(Lobby)

exports.joinLobby = catchAsync(async (req, res, next) => {
    const lobbyID = req.params.id
    const userID = req.user._id

    // Check if lobby exist and if it is full
    const lobby = await Lobby.findById(lobbyID)
    if(!lobby)
        return next(new AppError('Lobby does not exist', 400))
    if(lobby.isFull())
        return next(new AppError('Lobby is already full', 400))
    
    // Check if the user exists
    const userExists = await User.findById(userID)
    if(!userExists)
        return next(new AppError('User does not exist', 400))

    // Check if user is already in that lobby
    if(lobby.players.includes(userID))
        return next(new AppError('User is already in that lobby', 400))
     
    // Push user and save
    lobby.players.push(userID)
    lobby.save()

    res.status(200).json({
        status: 'success',
        data: {lobby}
    })
})

exports.restrictToCreator = catchAsync(async (req, res, next) => {
    if (!req.user)
        return next(new AppError('Please log in again', 404))

    const lobby = await Lobby.findById(req.params.id)
    if (!req.user._id.equals(lobby._idUser))
        return next(new AppError('Current user is not the creator of this lobby'))

    next()
})