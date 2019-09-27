const departmentRouter = require('express').Router()
const knex = require('../utils/knex')
const {complaintTable} = require('../utils/config')

departmentRouter.get('/complaints', (req, res) => {
    const deptID = req.body.deptid

    knex(complaintTable)
        .where({DeptID: deptID})
        .then(rows => {
            res.json({
                success: true,
                data: rows
            })
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = departmentRouter