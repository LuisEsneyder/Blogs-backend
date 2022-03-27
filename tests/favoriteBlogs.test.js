const favoriteBlog = require('../utils/list_helper').favoriteBlog
const blogs =require('../utils/list_helper').blogs
describe('favorite blog',()=>{
    test('favorite blog like max',()=>{
        const result = favoriteBlog(blogs)
        expect(result).toEqual({title: 'Canonical string reduction',author: 'Edsger W. Dijkstra',likes: 12})
    })
})