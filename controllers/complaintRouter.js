const complaintRouter = require('express').Router()
const knex = require('../utils/knex')
const {complaintTable}  = require('../utils/config')

// To add a new complaint
complaintRouter.post('/', (req, res) => {
    const complaint = {
        Subject: req.body.subject,
        Description: req.body.description,
        DeptID: req.body.deptid,
        RollNo: req.body.rollno,
        Time: new Date(),
        Status: 'Unprocessed',
    }

    knex(complaintTable)
        .insert(complaint)
        .then(() => {
            // succesfully registered
            res.json({
                success: true,
                data: {
                    message: 'Succesfully registered new complaint'
                }
            })
        })
        .catch(err => {
            // database error
            res.json({
                success: false,
                error: {
                    code: err.code,
                    message: err.sqlMessage
                }
            })
        })
})


module.exports = complaintRouter