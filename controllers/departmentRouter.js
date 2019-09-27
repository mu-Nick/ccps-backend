const departmentRouter = require('express').Router()
const knex = require('../utils/knex')
const {complaintTable} = require('../utils/config')

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