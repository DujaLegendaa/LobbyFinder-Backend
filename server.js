const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const mongoose = require('mongoose')
const app = require('./app')

const DB = process.env.DB_STRING.replace('<password>', process.env.DB_PASSWORD)

process.on('unhandeledRejection', err => {
    console.log(err.name, err.message)
    console.log('UNHANDELED REJECTION 💥 Shutting down')
    server.close(() => {
        process.exit(1)
    })
})

process.on('unhandeledException', err => {
    console.log(err.name, err.message)
    console.log('UNHANDELED EXCEPTION 💥 Shutting down')
    server.close(() => {
        process.exit(1)
    })
})

mongoose.connect(DB).
    then(() => {
        console.log('DB Connection successful')
    }).
    catch(() => {
        console.log('DB Connection failed')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening on ${port}`)
})
