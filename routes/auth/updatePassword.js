const AdminUser = require("../../models/AdminUser");
const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middleware/async");
const loginLimite = require("../../middleware/authLimit");
const sendTokenResponse = require("../../utils/sendTokenResponse");
const { protect } = require("../../middleware/auth");


module.exports = (app) => {
	app.put("/updatepassword", protect, loginLimite, asyncHandler(async (req, res, next) => {

		const adminUser = await AdminUser.findById(req.adminUser.id).select('+password');

		// Check current password
		if (!(await adminUser.matchPassword(req.body.currentPassword))) {
			return next(new ErrorResponse('Password is incorrect', 401));
		}

		adminUser.password = req.body.newPassword;
		await adminUser.save();

		sendTokenResponse(adminUser, 200, res);
	}))
}