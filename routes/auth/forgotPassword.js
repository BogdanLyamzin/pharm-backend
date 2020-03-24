const AdminUser = require("../../models/AdminUser");
const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middleware/async");
const sendTokenResponse = require("../../utils/sendTokenResponse");
const sendMail = require("../../utils/sendMail");


module.exports = (app) => {
	app.post("/forgotpassword", asyncHandler(async (req, res, next) => {
		const adminUser = await AdminUser.findOne({ email: req.body.email });

		if (!adminUser) {
			return next(new ErrorResponse('There is no user with that email', 404));
		};
		// Get reset token
		const resetToken = adminUser.generatorResetPasswordToken();
		await adminUser.save({ validateBeforeSave: false });

		// Create reset url
		const resetUrl = `${req.protocol}://${req.get(
				'host'
		)}/resetpassword/${resetToken}`;

		const text = `You are receiving this email because you (or someone else) has requested the reset of a password. 
		Please make a PUT request to: \n\n ${resetUrl}`;

		try {
			await sendMail({
				email: adminUser.email,
				subject: 'Password reset token',
				text
			});

			res.status(200).json({ success: true, data: 'Email sent' });
		} catch (err) {
			console.log(err);
			adminUser.resetPasswordToken = undefined;
			adminUser.resetPasswordExpire = undefined;

			await adminUser.save({ validateBeforeSave: false });

			return next(new ErrorResponse('Email could not be sent', 500));
		}
	}))
};
