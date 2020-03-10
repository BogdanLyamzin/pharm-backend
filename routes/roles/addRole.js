const Role = require("../../models/role");

module.exports = (app) => {
	app.post("/role", async (req, res) => {
		try {
			const newRole = {...req.body};
			const role = new Role(newRole)
			const result = await role.save();
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