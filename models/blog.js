const mongoose = require('mongoose')

const blogsShecma = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
}) 

module.exports = mongoose.model('Blog',blogsShecma)