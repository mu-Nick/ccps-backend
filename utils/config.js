// To set the configuration/environment variables
require('dotenv').config()

// Config variables
const {PORT, DB_NAME, DB_USERNAME, DB_PASSWORD} = process.env

export default {
    PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD
}

