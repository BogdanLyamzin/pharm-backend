const Role = require("../../models/role");

module.exports = (app) => {
	app.put("/role/:id", async (req, res) => {
		try {
			const id = req.params.id;
			const newRole = {...req.body};
			const result = await Role.findByIdAndUpdate(id, newRole);

			res.send({
				status: "Success",
				result
			});
		}catch (err) {
			res.send({
				status: "Error",
				message: err.message
			})
		}
	})
}