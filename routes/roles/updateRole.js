const Role = require("../../models/Role");
const asyncHandler = require("../../middleware/async");
const ErrorResponse = require('../../utils/errorResponse');
const { protect, authorize } = require("../../middleware/auth");

module.exports = (app) => {
	app.put("/roles/:id", protect, authorize("admin"),  asyncHandler(async (req, res, next) => {
		const id = req.params.id;
		const qerBody = {...req.body};
		const role = await Role.findById(id);
		const pages = [...role.allowPages];

		if (!role) {
			return next(new ErrorResponse(`Role not found with id of ${id}`, 404));
		};

		if(qerBody.allowPages && pages.includes(qerBody.allowPages)){
			return next(new ErrorResponse(`${qerBody.allowPages} is allowed to this role`, 400));
		}else if(qerBody.allowPages){
			pages.push(qerBody.allowPages);
		};

		qerBody.allowPages = pages;

		await Role.findByIdAndUpdate(id, qerBody);
		const data = await Role.findById(id);

		res.status(201).json({
			success: true,
			data
		});
	}))
}