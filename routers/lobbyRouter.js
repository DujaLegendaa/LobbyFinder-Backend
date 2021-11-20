const express = require('express')
const lobbyController = require('./../controllers/lobbyController')

const router = express.Router()

router.
    route('/')
    .get(lobbyController.getAllLobbies)
    .post(lobbyController.createLobby)

router.
    route('/:id')
    .get(lobbyController.getLobby)
    .patch(lobbyController.updateLobby)
    .delete(lobbyController.deleteLobby)

router.post('/join', lobbyController.joinLobby)

module.exports = router