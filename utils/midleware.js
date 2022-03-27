const logger = require('./logger')

const requestLogger = (req,res,next)=>{
    logger.info('Methodo:', req.method)
    logger.info('path:', req.path)
    logger.info('body:',req.body)
    logger.info('___')
    next()
}
const unknownEndpoint = (req,res)=>{
    res.status(404).send({error : 'unknow endponid'})
}

const errorHandler = (req,res,next)=>{
    logger.error(error.message)
    if(error.message === 'castError'){
        return res.status(400).json({error : 'malformated id'})
    }
    if(error.message === 'ValidationError'){
        return res.status(400).json({error:'propiedad requrida'})
    }
    if(error.message==='ValidatorError'){
        res.status(400).json({error : 'propiedad unica'})
    }
    if(error.message ==='JsonWebTokenError'){
        return res.status(401).send({error : 'invalid token'})
    }
    next()
}

module.exports = {requestLogger, unknownEndpoint,errorHandler}