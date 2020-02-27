const AdminUser = require("../../models/adminUser");

module.exports = (app) => {
	app.get("/adminUser", async (req, res) => {
		try {
			const adminUsers = await AdminUser.find();
			res.send({
				status: "Success",
				result: adminUsers
			});
		}catch (err) {
			res.send({
				status: "Error",
				message: err.message
			})
		}
	})
}