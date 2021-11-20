const express = require('express')
const lobbyController = require('./../controllers/lobbyController')
const authController = require('./../controllers/authController')

const router = express.Router()

router.
    route('/')
    .get(authController.protect, lobbyController.getAllLobbies)
    .post(lobbyController.createLobby)

router.
    route('/:id')
    .get(lobbyController.getLobby)
    .patch(lobbyController.updateLobby)
    .delete(lobbyController.deleteLobby)

router.post('/:id/join', lobbyController.joinLobby)

module.exports = router