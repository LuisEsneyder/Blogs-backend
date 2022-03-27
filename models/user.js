const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

const userShema = new mongoose.Schema({
    username : {
        type : String,
        minlength : 3,
        required : true,
        unique: true
    },
    name : {
        type : String,
        minlength : 3,
        required : true
    },
    passwordHas: {
        type : String,
        required : true
    },
    blogs : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Blog'
    }]
})
userShema.plugin(validator)
userShema.set('toJSON',(document,returnedObject)=>{
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHas
})

module.exports = mongoose.model('Users',userShema)