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


complaintRouter.post('/:compid/addsupporter', (req, res) => {
    const compID = req.params.compid
    const rollNo = req.body.rollno

    Promise.all([
        knex(complaintTable)
            .where({ID: compID})
            .select('Supporters')
            .then(rows => {
                let supporters = JSON.parse(rows[0].Supporters)
                if (!supporters) {
                    supporters = []
                }
                supporters.push(rollNo)
                knex(complaintTable)
                    .where({ID: compID})
                    .update({Supporters: JSON.stringify(supporters)})
                    .then(() => {
                        console.log("SUPPORTED")
                    })
            })
        ,
        knex(studentTable)
            .where({Roll: rollNo})
            .select('Notifications')
            .then(not => {
                let newNotification = JSON.parse(not[0].Notifications)
                newNotification = newNotification.filter(notification => notification.complaintID !== compID)
                console.log(newNotification)
                knex(studentTable)
                    .where({Roll: rollNo})
                    .update({Notifications: JSON.stringify(newNotification)})
                    .then(() => {
                        console.log("REMOVED")
                    })
            })
        ])
        .then(() => {
            res.json({
                success: true
            })
        })
        .catch(err => {
            console.log(err)
        })
})


complaintRouter.put('/:compid/changestatus', (req, res) => {
    const compID = req.params.compid
    const newStatus = req.body.status

    knex(complaintTable)
        .where({ID: compID})
        .update({Status: newStatus})
        .then(() => {
            res.json({
                success: true
            })
        })
        .catch(err => {
            console.log(err)
        })
})


module.exports = complaintRouter