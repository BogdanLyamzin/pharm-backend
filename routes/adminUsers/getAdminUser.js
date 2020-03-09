const AdminUser = require("../../models/adminUser");

module.exports = (app) => {
	app.get("/adminUsers/:id", async (req, res) => {
		try {
			const adminUser = await AdminUser.findById(req.params.id).populate({path: "role", select: "role"});
			const user = {
				name: adminUser.name,
				_id: adminUser._id,
				email: adminUser.email,
				phone: adminUser.phone,
				password: "",
				department: adminUser.department,
				role: adminUser.role.role
			};

			res.send({
				status: "Success",
				result: user
			});

		}catch (err) {
			res.send({
				status: "Error",
				message: err.message
			})
		}
	})
}