const AdminUser = require("../../models/AdminUser");
const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middleware/async");
const loginLimite = require("../../middleware/authLimit");
const sendTokenResponse = require("../../utils/sendTokenResponse");


module.exports = (app) => {
	app.post("/login", loginLimite, asyncHandler(async (req, res, next) => {
		const { email, password } = req.body;

		// Validate emil & password
		if (!email || !password) {
			return next(new ErrorResponse('Please provide an email and password', 400));
		};

		// Check for user
		const adminUser = await AdminUser.findOne({ email }).select('+password');

		if (!adminUser) {
			return next(new ErrorResponse('This user does not exist', 401));
		};
		// Check if password matches
		const isMatch = await adminUser.matchPassword(password);

		if (!isMatch) {
			return next(new ErrorResponse('Invalid password', 401));
		};

		sendTokenResponse(adminUser, 200, res);
	}))
}