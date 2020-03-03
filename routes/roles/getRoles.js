const Role = require("../../models/role");

module.exports = (app) => {
	app.get("/role", async (req, res) => {
		try {
			const roles = await Role.find();
			res.send({
				status: "Success",
				result: roles
			});
		}catch (err) {
			res.send({
				status: "Error",
				message: err.message
			})
		}
	})
}