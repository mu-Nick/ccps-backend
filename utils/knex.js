// Module to initialize database connection
const knex = require("knex")({
	client: "mysql",
	connection: {
		host: "127.0.0.1",
		user: "root",
		password: "Sierra@117",
		database: "ccps"
	}
});

module.exports = knex;

