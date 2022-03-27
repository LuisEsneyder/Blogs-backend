const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const userRouter = require('express').Router()

userRouter.post('/',async(req,res,next)=>{
    const body = req.body
    try {
        if(body.passwordHas === undefined){
            return res.status(400).json({error : 'debe ingresar contraseña'})
        }
         if(body.passwordHas.length < 3){
             return res.status(400).json({error : 'contraseña menor a 3'})
         }
         const passwordHas = await bcrypt.hash(body.passwordHas,10)
         const newuser = new User({
             username : body.username,
             name : body.name,
             passwordHas : passwordHas
         })
         const user = await newuser.save()
         res.status(201).json(user)
    } catch (error) {
        next(error)
    }
    
})
userRouter.get('/',async(req,res,next)=>{
    const users = await User.find({}).populate('blogs',{title : 1, author : 1})
    res.status(200).json(users)
})

module.exports = userRouter