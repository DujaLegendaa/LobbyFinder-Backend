const express = require('express')
const morgan = require('morgan')
const userRouter = require('./routers/userRouter')
const lobbyRouter = require('./routers/lobbyRouter')
const gameRouter = require('./routers/gameRouter')
const globalErrorHandler = require('./controllers/errorController')

const app = express()

if(process.env.NODE_ENV == 'development')
    app.use(morgan('dev'))
app.use(express.json())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/lobbies', lobbyRouter)
app.use('/api/v1/games', gameRouter)

app.use(globalErrorHandler)

module.exports = app