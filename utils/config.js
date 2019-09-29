// To set the configuration/environment variables
require('dotenv').config()

// Environment variables
const {PORT, DB_NAME, DB_USERNAME, DB_PASSWORD} = process.env

// SQL Table names
const studentTable = "students"
const departmentTable = "departments"
const complaintTable = "complaints"
const supporterTable = "supporters"

// Database connection object
const DB_CONNECTION = process.env.NODE_ENV === 'development' ?
    {
        host: "127.0.0.1",
		database: DB_NAME,
		user: DB_USERNAME,
		password: DB_PASSWORD
    }
    :
    process.env.DATABASE_URL


module.exports = {
    PORT,
    DB_CONNECTION,
    studentTable,
    departmentTable,
    complaintTable,
    supporterTable
}

