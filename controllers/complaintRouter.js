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
        .returning('ID')
        .insert(complaint)
        .then((id) => {
            // succesfully registered, return the complaintid
            res.json({
                success: true,
                data: {
                    id: id[0],
                    message: 'Succesfully registered new complaint'
                }
            })
        })
        .catch(err => {
            console.log(err)
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

// TO send support request to other students
complaintRouter.post('/:compid/addsupporters', (req, res) => {
    const supporterList = req.body.supporters
    const complaintID = req.params.compid

    // First get the complaint title and description
    knex(complaintTable)
        .where({ID: complaintID})
        .then((rows) => {
            const message = {
                complaintID,
                subject: rows[0].Subject,
                description: rows[0].Description,
                message: "Please support this complaint.",
                type: 'SUP_REQ'
            }

            Promise.all(supporterList.map(roll =>
                knex(studentTable)
                .where({Roll: roll})
                .select('Notifications')
                .then(not => {
                    // fetch his notifications array
                    let newNotification = not[0].Notifications
                    if (!newNotification) {
                        newNotification = []
                    }
                    // if already present, return
                    if (newNotification.find(notification =>
                        notification.type === 'SUP_REQ' &&
                        notification.complaintID === complaintID)) {
                            return
                        }
                    // else add new notification
                    newNotification.push(message)
                    knex(studentTable)
                        .where({Roll: roll})
                        .update({Notifications: JSON.stringify(newNotification)})
                        .then(() => {
                            console.log("ADDED")
                        })
                })
            ))
            .then(() => {
                res.json({
                    success: true
                })
            })
            .catch(err => {
                console.log(err)
            })
    })
})

// If support request was accepted by student
complaintRouter.post('/:compid/confirmsupport', (req, res) => {
    const compID = req.params.compid
    const rollNo = req.body.rollno

    Promise.all([
        knex(complaintTable)
            .where({ID: compID})
            .select('Supporters')
            .then(rows => {
                let supporters = rows[0].Supporters
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
                // fetch current notifications
                let removeNotification = not[0].Notifications
                // remove this support request
                removeNotification = removeNotification.filter(notification =>
                    notification.complaintID !== compID &&
                    notification.type !== 'SUP_REQ')
                // set new notifications
                knex(studentTable)
                    .where({Roll: rollNo})
                    .update({Notifications: JSON.stringify(removeNotification)})
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