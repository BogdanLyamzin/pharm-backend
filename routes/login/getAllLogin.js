const Login = require("../../models/login");

module.exports = (app) => {
	app.get("/login", async (req, res) => {

		try {
			const result = await Login.find()
					.populate({path: "email", select: "email"})
					.populate({path: "password", select: "password"});

			const logins = result.map((login) => ({
				_id: login._id,
				email: login.email.email,
				password: login.password.password,})
			);

			res.send({
				status: "Success",
				result: logins
			});
		}catch (err) {
			res.send({
				status: "Error",
				message: err.message
			})
		}
	})
}