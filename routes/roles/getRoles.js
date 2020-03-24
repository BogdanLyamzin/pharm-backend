const Role = require("../../models/Role");
const asyncHandler = require("../../middleware/async");
const advancedResults = require("../../middleware/advancedResults");
const { protect, authorize } = require("../../middleware/auth");

module.exports = (app) => {
	app.get("/roles", protect, authorize("admin"), advancedResults(Role), asyncHandler(async (req, res) => {
		res.status(200).json(res.advancedResults);
	}))
}