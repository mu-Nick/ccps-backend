// Module to initialize database connection
const {DB_NAME, DB_USERNAME, DB_PASSWORD} = require('../utils/config')

const knex = require("knex")({
	client: "mysql",
	connection: {
		host: "127.0.0.1",
		user: DB_USERNAME,
		password: DB_PASSWORD,
		database: DB_NAME
	}
});

module.exports = knex;

