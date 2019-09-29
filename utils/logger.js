// Logging functions

const info = (...params) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(...params)
    }
}

const logger = (...params) => {
    console.log(...params)
}

module.exports = {
    info, logger
}