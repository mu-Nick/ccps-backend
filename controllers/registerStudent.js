const bcrypt = require('bcrypt-nodejs')
const knex = require('../knex')

module.exports = (app) => {

    app.get('/student', (req, res) => {
        knex('students')
            .count()
            .then(result => {
                res.json({
                    success: true,
                    data: {
                        count: result
                    }
                });
            })
            .catch(err => {
                console.log(err.sqlMessage)
                res.status(404)
            })
    })

    app.post('/student', (req, res) => {
        const student = {
            Name: req.body.name,
            Email: req.body.email,
            Roll: req.body.rollno,
            Hash: bcrypt.hashSync(req.body.password)
        }
        knex('students')
            .insert(student)
            .then((result) => {
                res.json({
                    success: true,
                    message: `Succesfully added ${req.body.name}`
                })
            })
            .catch(err => {
                console.log(err.sqlMessage)
                res.status(404).json({success: false})
            })
    })

    app.post('/studentlogin', (req, res) => {
        const student = {
            Roll: req.body.rollno,
            Password: req.body.password
        }
        knex('students').where({
            Roll: student.Roll
        })
        .then(rows => {
            if (bcrypt.compareSync(student.Password, rows[0].Hash)) {
                res.json(rows[0])
            }
            else {
                res.status(404).json(null)
            }
        })
    })

}