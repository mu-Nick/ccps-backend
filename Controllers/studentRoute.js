const knex = require('../knex')
module.exports = (app) => {
    app.get('/student/:roll', (req, res) => {
        console.log(req.params.roll)
        let student = null
        let comps = []

        Promise.all([
            knex('students')
                .where({Name: "Pragun"})
                .then(rows => {
                    student = rows[0]
                }),
            knex('complaints')
                .where({RollNo: req.params.roll})
                .then(rows => {
                    comps = rows
                }),
        ])
        .then(() => comps.map(comp => {
            return knex('supporters')
                .where({complaintid: comp.id})
                .count()
                .then(rows => {
                    console.log(rows[0]["count(*)"])
                    return rows[0]["count(*)"]
                })
        }))
        .then((promises) => Promise.all([...promises])
            .then((res) => {
                res.forEach((supp, i) => comps[i].supporters = supp)
            })
            .then(() => {
                res.send({
                    student,
                    comps
                })
            })
        )
    })
}