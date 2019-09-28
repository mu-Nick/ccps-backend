const loginRouter = require('express').Router()
const bcrypt = require('bcrypt-nodejs')
const knex = require("../utils/knex")
const {studentTable, departmentTable} = require('../utils/config')

// TO login student
loginRouter.post('/student', (req, res) => {
	const student = {
		Roll: req.body.rollno,
		Password: req.body.password
	}
	// Retrieve hash of student with the rollno
	knex(studentTable)
		.where({Roll: student.Roll})
		.then(rows => {
			// No record found
			if (rows.length < 1) {
				res.json({
					success: false,
					error: {
						code: 'NO_REC_FOUND',
						message: `No record found for ${student.Roll}`
					}
				})
				throw new Error()
			}
			const hash = rows[0].Hash
			if (bcrypt.compareSync(student.Password, hash)) {
				// Succesful log in
				res.json({
					success: true,
					data: {
						Name: rows[0].Name,
						Email: rows[0].Email,
						Roll: rows[0].Roll,
						Notifications: rows[0].Notifications
					}
				})
			}
			else {
				// Wrong password
				res.json({
					success: false,
					error: {
						code: 'WRONG_PASS',
						message: 'Incorrect password'
					}
				})
				throw new Error()
			}
		})
		.catch(err => {
			console.log(err)
		})
})


// TO login department
loginRouter.post('/department', (req, res) => {
	const department = {
		ID: req.body.id,
		Password: req.body.password
	}
	// Retrieve hash of department with the id
	knex(departmentTable)
		.where({ID: department.ID})
		.then(rows => {
			// No record found
			if (rows.length < 1) {
				res.json({
					success: false,
					error: {
						code: 'NO_REC_FOUND',
						message: `No record found for ${department.ID}`
					}
				})
				throw new Error()
			}
			const hash = rows[0].Hash
			if (bcrypt.compareSync(department.Password, hash)) {
				// Succesful log in
				res.json({
					success: true,
					data: {
						Name: rows[0].Name,
						Email: rows[0].Email,
						ID: rows[0].ID
					}
				})
			}
			else {
				// Wrong password
				res.json({
					success: false,
					error: {
						code: 'WRONG_PASS',
						message: 'Incorrect password'
					}
				})
				throw new Error()
			}
		})
		.catch(err => {
			console.log(`Login error`)
		})
})


module.exports = loginRouter
