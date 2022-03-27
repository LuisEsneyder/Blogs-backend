require('dotenv').config()

let MONGO_Url= process.env.MONGO_Url
const PORT = process.env.PORT
if(process.env.NODE_ENV ==='test'){
    MONGO_Url = process.env.TEST_MONGO_URL
}
module.exports={
    MONGO_Url, PORT
}