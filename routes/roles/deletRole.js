const Role = require("../../models/role");

module.exports = (app) => {
	app.delete("/role/:id", async (req, res) => {
		try {

			const result = await Role.findByIdAndDelete(req.params.id);
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