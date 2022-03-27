const User = require('../models/user')
const bcrypt = require('bcryptjs')
const helper = require('./blog_helper')
const supertest = require('supertest')
const app = require('../app')
const api= supertest(app) 
describe('when there is initially one user in db',()=>{
    beforeEach(async () =>{
        await User.deleteMany({})
        const passwordHas = await bcrypt.hash('secrek',10)
        const user = new User({
            username : 'LuisEsneyder',
            name : 'Katherin',
            passwordHas : passwordHas
        })
        await user.save()
    })
    test('creation succeeds with a fresh username',async ()=>{
        const usersAtStart = await helper.userinDb()
        const newuser = {
            username : 'root',
            name : 'Luis Esneyder',
            passwordHas : 'luisVa'
        }
        await api.post('/api/users')
        .send(newuser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        const userAtEnd = await helper.userinDb()
        expect(userAtEnd).toHaveLength(usersAtStart.length + 1)
    })
})