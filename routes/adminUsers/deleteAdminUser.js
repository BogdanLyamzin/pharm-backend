const AdminUser = require("../../models/adminUser");

module.exports = (app) => {
	app.delete("/adminUsers/:id", async (req, res) => {
		try {
			//Find all pages and articles, which were created this user (to bind to Pages model...)
			//Update field "author"?
			const adminUser = await AdminUser.findByIdAndDelete(req.params.id).populate({path: "role", select: "role"});
			const user = {
				name: adminUser.name,
				_id: adminUser._id,
				email: adminUser.email,
				phone: adminUser.phone,
				password: adminUser.password,
				department: adminUser.department,
				role: adminUser.role.role
			};
			res.send({
				status: "Success",
				user
			});
		}catch (err) {
			res.send({
				status: "Error",
				message: err.message
			})
		}
	})
}