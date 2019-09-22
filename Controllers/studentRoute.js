const knex = require('../knex')

module.exports = (app) => {

    app.get('/student/:id', (req, res) => {
        console.log(req.params.id)
    })

}
