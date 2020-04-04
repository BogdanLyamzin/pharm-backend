const generator = require("generate-password");
const asyncHandler = require("../../middleware/async");

module.exports = (app) => {
	app.get("/generatePassword", asyncHandler((req, res) => {
		const password = generator.generate({
			length: 8,
			numbers: true,
			uppercase: true,
			symbols: true
		});
		res.status(200).json({
			success: true,
			data: password
		});
	}))
}