const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./blog_helper')


const api = supertest(app)

beforeEach(async()=>{
    await Blog.deleteMany({})
    const blogObject =helper.Inicialblogs
    .map(blog=>new Blog(blog))
    const promiseArray = blogObject.map(blog=>blog.save())
    await Promise.all(promiseArray) 
})

test('Blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
})
test('a valid blog can be added',async () => {
    const newBlog={
        title : 'Luis EL mejor',
        autor : 'Fernández',
        url : 'luis.com',
        likes : 5
    }
    await api.post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    const blogAtEnd = await helper.blogInDb()
    expect(blogAtEnd).toHaveLength(helper.Inicialblogs.length + 1)

})
test('a valid blog can be added likes',async () => {
    const newBlog={
        title : 'Luis EL mejor con 0 likes',
        author : 'Fernández',
        url : 'luis.com'
    }
    await api.post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    const blogAtEnd = await helper.blogInDb()
    expect(blogAtEnd).toHaveLength(helper.Inicialblogs.length + 1)
    const likes=blogAtEnd.map(blog => blog.likes)
    expect(likes).toContain(0)

})
test('a valid blog can be added url o title nulos',async () => {
    const newBlog={
        author : 'Fernández'
    }
    await api.post('/api/blogs')
    .send(newBlog)
    .expect(400)
    const blogAtEnd = await helper.blogInDb()
    expect(blogAtEnd).toHaveLength(helper.Inicialblogs.length)

})
afterAll(() => {
    mongoose.connection.close()
})
