const express = require('express')
const lobbyController = require('./../controllers/lobbyController')

const router = express.Router()

router.
    route('/')
    .get(lobbyController.getAllLobbbies)
    .post(lobbyController.createLobby)

router.
    route('/:id')
    .get(lobbyController.getLobby)
    .patch(lobbyController.updateLobby)
    .delete(lobbyController.deleteLobby)