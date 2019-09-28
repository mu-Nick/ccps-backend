const studentRouter = require('express').Router()
const knex = require('../utils/knex')
const {complaintTable} = require('../utils/config')
const {studentTable} = require('../utils/config')


// Retrieve complaint opened by this student
studentRouter.get('/:rollno/complaints', (req, res) => {
    // The roll no
    const roll = req.params.rollno
    // Fetch his complaints
    knex(complaintTable)
        .where({RollNo: roll})
        .then(rows => {
            res.json({
                success: true,
                data: rows
            })
        })
        .catch(err => {
            res.json({
                success: false
            })
        })
})


// Retrive notifications of this student
studentRouter.get('/:rollno/notifications', (req, res) => {
    const roll = req.params.rollno
    knex(studentTable)
        .where({Roll: roll})
        .then(rows => {
            res.json({
                success: true,
                data: {
                    notifications: rows[0].Notifications
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = studentRouter
