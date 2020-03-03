const Login = require("../../models/login");

module.exports = (app) => {
	app.get("/login/:id", async (req, res) => {

		try {
			const result = await Login.findById(req.params.id)
					.populate({path: "email", select: "email"})
					.populate({path: "password", select: "password"});
			const login = {
				_id: result._id,
				email: result.email.email,
				password: result.password.password,
			};

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
	})
}