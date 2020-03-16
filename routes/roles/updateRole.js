const Role = require("../../models/role");
const asyncHandler = require("../../middleware/async");
const ErrorResponse = require('../../utils/errorResponse');

module.exports = (app) => {
	app.put("/roles/:id",  asyncHandler(async (req, res) => {
		const id = req.params.id;
		const role = await Role.findById(id);

		if (!role) {
			return next(new ErrorResponse(`Role not found with id of ${id}`, 404));
		};

		const data = await Role.findByIdAndUpdate(id, req.body);

		res.status(201).json({
			success: true,
			data
		});
	}))
}