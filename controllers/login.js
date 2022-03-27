const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const loginROuter = require('express').Router()

loginROuter.post('/', async (req, res, next) => {
    const body = req.body
    try {
        const user = await User.findOne({ username: body.username })
        const passwordcorrect = user === null ? false : await bcrypt
            .compare(body.passwordHas, user.passwordHas)
        if (!(user && passwordcorrect)) {
            return res.status(401).json({
                error: 'invalided username or password'
            })
        }
        const userFomatToken = {
            username: user.username,
            id: user._id
        }
        const token = jwt.sign(userFomatToken, process.env.SECRET)
        res.status(200).send({ token, username: user.username, name: user.name })
    } catch (error) {
        next(error)
    }

})

module.exports = loginROuter