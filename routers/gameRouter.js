const express = require('express')
const gameController = require('./../controllers/gameController')
const authController = require('./../controllers/authController')

const router = express.Router()

router.
    route('/')
    .get(gameController.getAllGames)
    .post(authController.protect, authController.restrictToRole('admin'), gameController.createGame)

router.
    route('/:id')
    .get(gameController.getGame)
    .patch(authController.protect, authController.restrictToRole('admin'), gameController.updateGame)
    .delete(authController.protect, authController.restrictToRole('admin'), gameController.deleteGame)

module.exports = router