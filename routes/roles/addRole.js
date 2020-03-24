const Role = require("../../models/Role");
const asyncHandler = require("../../middleware/async");
const { protect, authorize } = require("../../middleware/auth");

// @access   role=admin???
module.exports = (app) => {
	app.post("/roles", protect, authorize("admin"), asyncHandler(async (req, res, next) => {
		const newRole = {...req.body};
		const role = new Role(newRole)
		const data = await role.save();
		res.status(201).json({
			success: true,
			data
		});
	}))
}