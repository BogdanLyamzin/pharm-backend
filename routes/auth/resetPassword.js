const AdminUser = require("../../models/AdminUser");
const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middleware/async");
const sendTokenResponse = require("../../utils/sendTokenResponse");
const CryptoJS = require("crypto-js");
const { secret } = require("../../configs/db").jwt;

module.exports = (app) => {
	app.put("/resetpassword/:resettoken", asyncHandler(async (req, res, next) => {
		const bytes  = CryptoJS.AES.decrypt(req.params.resettoken, secret);
		const resetPasswordToken = bytes.toString(CryptoJS.enc.Utf8);
		console.log(resetPasswordToken)

		const adminUser = await AdminUser.findOne({
			resetPasswordToken,
			resetPasswordExpire: { $gt: Date.now() }
		});

		if (!adminUser) {
			return next(new ErrorResponse('Invalid token', 400));
		};
		// Set new password
		adminUser.password = req.body.password;
		adminUser.resetPasswordToken = undefined;
		adminUser.resetPasswordExpire = undefined;
		await adminUser.save();

		sendTokenResponse(adminUser, 200, res);

	}))
};
