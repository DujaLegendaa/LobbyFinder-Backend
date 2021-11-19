const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const mongoose = require('mongoose')
const app = require('./app')

const DB = process.env.DB_STRING.replace('<password>', process.env.DB_PASSWORD)

mongoose.connect()

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening on ${port}`)
})
