require('dotenv').config()
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/user')
const loginROuter = require('./controllers/login')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const midleware = require('./utils/midleware')
const config = require('./utils/config')

const Url = config.MONGO_Url
logger.info('conecting to', Url)

mongoose.connect(Url)
.then(res=>{
    logger.info('connected to mongodb')
}).catch(erro=>{
    logger.error('error connecting to MongoDb',erro.message)
})


const app = express()
app.use(cors())
app.use(express.json())
app.use(midleware.requestLogger)

app.use('/api/blogs',blogRouter)
app.use('/api/users',userRouter)
app.use('/api/login',loginROuter)
app.use(midleware.unknownEndpoint)
app.use(midleware.errorHandler)

module.exports = app

