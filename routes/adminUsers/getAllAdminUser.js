const AdminUser = require("../../models/adminUser");

module.exports = (app) => {
	app.get("/adminUser", async (req, res) => {

		try {
			const adminUsers = await AdminUser.find().populate({path: "role", select: "role"});
			const users = adminUsers.map((user) => ({
				name: user.name,
				email: user.email,
				phone: user.phone,
				password: user.password,
				department: user.department,
				role: user.role.role }));

			res.send({
				status: "Success",
				result: users
			});
		}catch (err) {
			res.send({
				status: "Error",
				message: err.message
			})
		}
	})
}