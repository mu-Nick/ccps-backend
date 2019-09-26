const knex = require("../knex");

const handleSignin = (req, res) => {
	const { id, password, usr } = req.body;

	if (!id || !password || !usr) {
		return res.status(400).json("incorrect login credentials");
	}

	if (usr === "student") {
		knex("students")
			.where("Roll", "=", id)
			.then(loginInfo => {
				if (password == loginInfo[0].pass) {
					knex("students")
						.where("Roll", "=", id)
						.select("Roll", "Name", "Email")
						.then(user => {
							res.json(user[0]);
						});
				} else {
					res.status(400).json("incorrect password");
				}
			})
			.catch(err => res.status(400).json("user not found"));
	} else {
		knex("departments")
			.where("id", "=", id)
			.then(loginInfo => {
				if (password === loginInfo[0].pass) {
					knex("departments")
						.where("id", "=", id)
						.select("id", "Name", "Email")
						.then(user => {
							res.json(user[0]);
						});
				} else {
					res.status(400).json("incorrect password");
				}
			})
			.catch(err => res.status(400).json("user not found"));
	}
};

module.exports = {
	handleSignin
};
