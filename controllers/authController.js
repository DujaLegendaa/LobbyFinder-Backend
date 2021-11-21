const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')
const User = require('./../models/userModel')
const util = require('util')

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

module.exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    })

    const token = signToken(newUser._id)

    res.status(201).json({
        status: 'success',
        token,
        data: {newUser}
    })
})

module.exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body

    if(!email || !password)
        next(new AppError('Please provide email and password!', 400))

    const user = await User.findOne({email}).select('+password')

    if(!user || !(await user.correctPassword(password))) 
        next(new AppError('Incorrect email or password'))

    const token = signToken(user._id)

    res.status(200).json({
        status: 'success',
        token,
    })
})

module.exports.protect = catchAsync(async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1]

    if(!token)
        next(new AppError('You are not logged in. Please log in to access this route.', 404))

    const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET)
    
    const user = await User.findById(decoded.id)
    if(!user)
        next(new AppError('The user with this token does not exist', 401))

    if(user.changedPasswordAfter(decoded.iat))
        next(new AppError('User recently changed password. Please log in again.', 401))

    req.user = user
    next()
})

module.exports.restrictToRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role))
            next(new AppError('You do not have permission to access this route'))

        next()
    }
}

module.exports.forgotPassword = catchAsync(async (req, res, next) => {
    const user = User.findOne({email: req.body.email})
    if(!user)
        next(new AppError('There is no user with this email address', 404))

    const resetToken = user.createPasswordResetToken()
    await user.save({validateBeforeSave: false})
})