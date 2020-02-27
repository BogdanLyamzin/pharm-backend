const AdminUser = require("../../models/adminUser");

module.exports = (app) => {
	app.get("/adminUser/:id", async (req, res) => {
		try {
			const adminUser = await AdminUser.findById(req.params.id);
			res.send({
				status: "Success",
				result: adminUser
			});
		}catch (err) {
			res.send({
				status: "Error",
				message: err.message
			})
		}
	})
}