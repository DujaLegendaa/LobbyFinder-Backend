const mongoose = require('mongoose')
const bcrpyt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: [true, "name not provided"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "email not passed"],
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, "provide a valid email"]
    },
    password: { 
        type: String, 
        required: [true, "password not provided"],
        select: process.env.NODE_ENV == 'development' ? true : false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'password confirm not provided'],
        validate: {
            validator: function (el) {
                return this.password === el
            },
            message: 'passwords do not match'
        }
    },
    discordTag: { 
        type: String, 
        required: [true, "discord tag not provided"],
        validate: {
            validator: str => { RegExp('.+#\d{4}').test(str) },
            message: 'invalid discord tag'
        },
        unique: true
    },
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) next()

    this.password = await bcrpyt.hash(this.password, 12)

    this.passwordConfirm = undefined

    next()
})

userSchema.methods.correctPassoword = async function(candidatePassword, userPassword) {
    return await bcrpyt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema)

module.exports = User