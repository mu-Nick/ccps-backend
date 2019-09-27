const studentRouter = require('express').Router()
const knex = require('../utils/knex')
const {complaintTable} = require('../utils/config')

studentRouter.get('/:rollno/complaints', (req, res) => {
    // The roll no
    const Roll = req.params.rollno
    // Fetch his complaints
    knex(complaintTable)
        .where({RollNo: Roll})
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

module.exports = studentRouter
