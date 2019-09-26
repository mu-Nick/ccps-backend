const complaintRouter = require('express').Router()
const knex = require('../utils/knex')
const {studentTable, complaintTable}  = require('../utils/config')

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


complaintRouter.post('/:compid/supporters', (req, res) => {
    const supporterList = req.body.supporters
    const complaintID = req.params.compid

    const message = {
        complaintID,
        message: "Please support this complaint."
    }

    for (let i = 0; i < supporterList.length; i++) {
        const Roll = supporterList[i]
        knex(studentTable)
            .where({Roll: Roll})
            .select('Notifications')
            .then(not => {
                let newNotification = JSON.parse(not[0].Notifications)
                if (!newNotification) {
                    newNotification = []
                }
                newNotification.push(message)
                knex(studentTable)
                    .where({Roll: Roll})
                    .update({Notifications: JSON.stringify(newNotification)})
                    .then(() => {
                        console.log("ADDED")
                        res.json({
                            success: true
                        })
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
})


module.exports = complaintRouter