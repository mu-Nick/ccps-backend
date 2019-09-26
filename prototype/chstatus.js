const knex = require("../knex");

const handleStatus = (req, res) => {
	const { id, newStatus } = req.body;

	if (!id || !newStatus) return res.status(400).json("bad request");

	knex("complaints")
		.where({ compId: id })
		.update({ status: newStatus })
		.then(result => {
			knex("complaints")
				.where({ compId: id })
				.then(complaint => {
					res.json(complaint[0]);
				});
		})
		.catch(err => res.status(400).json("not able to update"));
};

module.exports = {
	handleStatus
};
