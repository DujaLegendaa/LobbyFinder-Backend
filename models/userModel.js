const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: [true, "name not provided"],
        unique: true
    },
    password: { 
        type: String, 
        required: [true, "password not provided"],
        select: false
    },
    discord: { 
        type: String, 
        required:[true, "discord not provided"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "email not passed"],
        unique: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User