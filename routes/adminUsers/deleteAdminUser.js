const AdminUser = require("../../models/AdminUser");
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require("../../middleware/async");

// @access   role=admin???
module.exports = (app) => {
	app.delete("/adminUsers/:id", asyncHandler(async (req, res, next) => {
		//Find all pages and articles, which were created this user (to bind to Pages model...)
		//Update field "author"?
		const adminUser = await AdminUser.findById(req.params.id);
		if (!adminUser) {
			return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
		};
		await adminUser.remove();
		res.status(200).json({ success: true, data: {} });
	}))
}