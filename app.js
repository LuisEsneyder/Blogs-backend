require('dotenv').config()
const blogRouter = require('./controllers/blogs')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const Url = process.env.MONGO_Url
console.log('conecting to', Url)

mongoose.connect(Url)
.then(res=>{
    console.log('connected to mongodb')
}).catch(erro=>{
    console.error('error connecting to MongoDb',erro.message)
})


const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/blogs',blogRouter)

module.exports = app

