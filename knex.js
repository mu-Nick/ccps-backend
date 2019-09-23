const knex = require("knex")({
	client: "mysql",
	connection: {
		host: "127.0.0.1",
		user: "anubhav",
		password: "Abcd@1234",
		database: "ccps"
	}
});


module.exports = knex;

