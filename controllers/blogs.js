const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/',(req,res)=>{
    Blog.find({}).then(blog=>{
        res.json(blog)
    })
})

blogRouter.post('/',(req,res)=>{
    const blog = Blog(req.body)
    blog.save().then(blogSave=>{
        res.status(201).json(blogSave)
    })
})
module.exports= blogRouter



