// Module to initialize database connection
const {DB_CONNECTION} = require('../utils/config')

const knex = require("knex")({
	client: "pg",
	debug: true,
	connection: DB_CONNECTION,
	ssl: true
})

module.exports = knex;

