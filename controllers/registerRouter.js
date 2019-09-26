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
                status: 'success',
                data: {
                    Name: department.Name,
                    Email: department.Email,
                    ID: department.ID
                }
            })
        })
        .catch(err => {
            // On failure
            console.log(`Database ERROR => ${err.code} : ${err.sqlMessage}`)
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
                status: 'success',
                data: {
                    Roll: student.Roll,
                    Name: student.Name,
                    Email: student.Email
                }
            })
        })
        // On errors
        .catch(err => {
            console.log(`Database ERROR => ${err.code} : ${err.sqlMessage}`)
            res.json({
                success: false,
                error: {
                    code: err.code,
                    message: err.sqlMessage
                }
            })
        })
})

// app.post('/studentlogin', (req, res) => {
//     const student = {
//         Roll: req.body.rollno,
//         Password: req.body.password
//     }
//     knex('students').where({
//         Roll: student.Roll
//     })
//     .then(rows => {
//         if (bcrypt.compareSync(student.Password, rows[0].Hash)) {
//             res.json(rows[0])
//         }
//         else {
//             res.status(404).json(null)
//         }
//     })
// })

module.exports = registerRouter