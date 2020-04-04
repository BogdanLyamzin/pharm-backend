const AdminUser = require("../../models/AdminUser");
const asyncHandler = require("../../middleware/async");
const ErrorResponse = require('../../utils/errorResponse');
const { protect, authorize } = require("../../middleware/auth");

module.exports = (app) => {
	app.get("/adminUsers/:id", protect, authorize("admin"), asyncHandler(async (req, res, next) => {

		const adminUser = await AdminUser.findById(req.params.id).populate({path: "role", select: "role"});
		if (!adminUser) {
			return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
		}
		const data = {	...adminUser._doc, role: adminUser._doc.role.role};

		res.status(200).json({ success: true, data });
	}))
}
