const AdminUser = require("../../models/AdminUser");

module.exports = (app) => {
	app.post("/login", async (req, res) => {

		try {


			res.send({
				status: "Success",
				result: login
			});
		}catch (err) {
			res.send({
				status: "Error",
				message: err.message
			})
		}
	});
}