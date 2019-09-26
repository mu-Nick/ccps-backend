const knex = require("../knex");

const sendComps = (req, res) => {
	const { id, usr } = req.body;

	let comps = [];

	if (!id || !usr) {
		return res.status(400).json("bad request");
	}
	let interface = usr === "student" ? "Roll" : "deptId";

	knex("complaints")
		.where(interface, id)
		.then(complaints => {
			comps = complaints;
		})
		.then(() =>
			comps.map(comp => {
				return knex("supporters")
					.where({ compId: comp.compId })
					.count()
					.then(rows => {
						return rows[0]["count(*)"];
					});
			})
		)
		.then(promises =>
			Promise.all([...promises])
				.then(counts => {
					// console.log(counts);
					counts.forEach((supp, i) => (comps[i].supporters = supp));
				})
				.then(() => {
					res.json({ comps });
				})
		)
		.catch(err => res.status(400).json("not able to fetch"));
};

module.exports = {
	sendComps
};
