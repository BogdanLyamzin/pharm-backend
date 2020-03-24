const AdminUser = require("../../models/AdminUser");
const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middleware/async");
const sendTokenResponse = require("../../utils/sendTokenResponse");
const { protect } = require("../../middleware/auth");


module.exports = (app) => {
	app.get("/me", protect, asyncHandler(async (req, res, next) => {
		const user = await AdminUser.findById(req.adminUser._id).populate({path: "role", select: "role"});
		res.status(200).json({
			success: true,
			data: user
		});

	}))
}