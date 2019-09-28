// Defining custom middleware
const logger = require('./logger')

// Logs request information
const requestLogger = (req, res, next) => {
    logger.info('-----------------')
    logger.info('Method: ', req.method)
    logger.info('Path: ', req.path)
    logger.info('Body: ', req.body)
    logger.info('-----------------')
    next()
}


// Handles wrong endpoints
const uknownEndpoint = (req, res) => {
    res.status(404).send({error: 'Unknown Endpoint'})
}


module.exports = {
    requestLogger,
    uknownEndpoint
}