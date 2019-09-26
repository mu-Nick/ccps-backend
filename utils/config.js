// To set the configuration/environment variables
require('dotenv').config()

// Environment variables
const {PORT, DB_NAME, DB_USERNAME, DB_PASSWORD} = process.env

// SQL Table names
const studentTable = "students"
const departmentTable = "departments"
const complaintTable = "complaints"
const supporterTable = "supporters"


module.exports = {
    PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    studentTable,
    departmentTable,
    complaintTable,
    supporterTable
}

