const generator = require("generate-password");

module.exports = (app) => {
	app.get("/generatePassword", (req, res) => {

		try {
			const password = generator.generate({
				length: 8,
				numbers: true,
				uppercase: true,
				symbols: true
			});

			res.send({
				status: "Success",
				result: password
			});
		}catch (err) {
			res.send({
				status: "Error",
				message: err.message
			})
		}
	})
}