const Role = require("../../models/Role");
const asyncHandler = require("../../middleware/async");
const ErrorResponse = require('../../utils/errorResponse');

// @access   ???
module.exports = (app) => {
	app.delete("/roles/:id", asyncHandler(async (req, res, next) => {
		//What doing with adminUsers which ref with it???
		//pages???
		const role = await Role.findById(req.params.id);
		if (!role) {
			return next(new ErrorResponse(`Role not found with id of ${req.params.id}`, 404));
		};
		await role.remove();
		res.status(200).json({ success: true, data: {} });
	}))
}