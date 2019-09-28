const departmentRouter = require('express').Router()
const knex = require('../utils/knex')
const {complaintTable} = require('../utils/config')

// Get the list of complaints of this department
departmentRouter.get('/:deptid/complaints', (req, res) => {
    const deptID = req.params.deptid

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