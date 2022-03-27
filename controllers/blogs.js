const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTOkenFormat = req => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        return authorization.substring(7)
    }
    return null
}

blogRouter.get('/', async (req, res) => {
    const BlogsList = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(BlogsList)
})

blogRouter.post('/', async (req, res, next) => {
    const body = req.body
    try {
        
    const token = getTOkenFormat(req)
        const decoddedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decoddedToken) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decoddedToken.id)
        const newblog = new Blog({
            title: body.title,
            author: user.name,
            url: body.url,
            likes: body.likes || 0,
            user: user._id
        })
        const blogSave = await newblog.save()
        user.blogs = user.blogs.concat(blogSave._id)
        await User.findByIdAndUpdate(decoddedToken.id, user)
        res.json(blogSave)
    } catch (error) {
        next(error)
    }
})
blogRouter.delete('/:id', async (req, res, next) => {
    try {
        const token = getTOkenFormat(req)
        const decoddedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decoddedToken) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }
        const fiendBlog = await Blog.findOne({ user: decoddedToken.id })
        if (!fiendBlog) {
            return res.status(401).json({ error: 'usuario no valido para eliminar esta nota' })
        }
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } catch (error) {
        next(error)
    }

})
blogRouter.get('/:id', async (req, res) => {
    const BlogId = await Blog.findById(req.params.id)
    if (BlogId) {
        res.json(BlogId)
    }
    res.status(404).end()
})
blogRouter.put('/:id', async (req, res, next) => {
    const body = req.body
    const ubdateBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.user
    }
    try {
        await Blog.findByIdAndUpdate(req.params.id, ubdateBlog)
        res.json(ubdateBlog)
    } catch (exection) {
        next(exection)
    }
})
module.exports = blogRouter



