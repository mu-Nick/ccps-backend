// Module to initialize database connection
const {DB_NAME, DB_USERNAME, DB_PASSWORD} = require('../utils/config')

const knex = require("knex")({
	client: "pg",
	connection: {
		host: "127.0.0.1",
		database: DB_NAME,
		user: DB_USERNAME,
		password: DB_PASSWORD
	}
});

module.exports = knex;

