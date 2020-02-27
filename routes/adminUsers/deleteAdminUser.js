const AdminUser = require("../../models/adminUser");

module.exports = (app) => {
	app.delete("/adminUser/:id", async (req, res) => {
		try {
			//Find all pages and articles, which were created this user (to bind to Pages model...)
			//Update field "author"?
			const result = await AdminUser.findByIdAndDelete(req.params.id);
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