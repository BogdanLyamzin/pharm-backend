const asyncHandler = require("../../middleware/async");

module.exports = (app) => {
	app.get("/logout", asyncHandler(async (req, res, next) => {
		res.cookie('token', 'none', {
			expires: new Date(Date.now() + 10 * 1000),
			httpOnly: true
		});

		res.status(200).json({
			success: true,
			data: {}
		});
	}))
}