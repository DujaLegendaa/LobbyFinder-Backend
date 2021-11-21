const express = require('express')
const lobbyController = require('./../controllers/lobbyController')
const authController = require('./../controllers/authController')

const router = express.Router()

router.
    route('/')
    .get(authController.protect, lobbyController.getAllLobbies)
    .post(authController.protect, lobbyController.createLobby)

router.
    route('/:id')
    .get(authController.protect, lobbyController.getLobby)
    .patch(authController.protect, lobbyController.restrictToCreator, lobbyController.updateLobby)
    .delete(authController.protect, lobbyController.restrictToCreator, lobbyController.deleteLobby)

router.patch('/:id/join', authController.protect, lobbyController.joinLobby)

module.exports = router