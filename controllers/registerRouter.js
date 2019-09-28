const registerRouter = require('express').Router()
const bcrypt = require('bcrypt-nodejs')
const knex = require('../utils/knex')
const {studentTable, departmentTable} = require('../utils/config')

// To register a new department
registerRouter.post('/department', (req, res) => {
    const department = {
        ID: req.body.id,
        Name: req.body.name,
        Email: req.body.email,
        Hash: bcrypt.hashSync(req.body.password)
    }
    knex(departmentTable)
        .insert(department)
        .then(() => {
            // On success
            res.json({
                sucess: true,
                data: {
                    Name: department.Name,
                    Email: department.Email,
                    ID: department.ID
                }
            })
        })
        .catch(err => {
            // On failure
            res.json({
                success: false,
                error: {
                    code: err.code,
                    message: err.sqlMessage
                }
            })
        })
})

// To register a new student
registerRouter.post('/student', (req, res) => {
    // Student details from client
    const student = {
        Name: req.body.name,
        Email: req.body.email,
        Roll: req.body.rollno,
        Hash: bcrypt.hashSync(req.body.password)
    }
    // Insert into database
    knex(studentTable)
        .insert(student)
        .then(() => {
            // Succesfully registered
            res.json({
                success: true,
                data: {
                    Roll: student.Roll,
                    Name: student.Name,
                    Email: student.Email
                }
            })
        })
        // On errors
        .catch(err => {
            res.json({
                success: false,
                error: {
                    code: err.code,
                    message: err.sqlMessage
                }
            })
        })
})

module.exports = registerRouter