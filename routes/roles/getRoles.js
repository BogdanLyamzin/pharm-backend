const Role = require("../../models/role");
const asyncHandler = require("../../middleware/async");
const advancedResults = require("../../middleware/advancedResults");


module.exports = (app) => {
	app.get("/roles", advancedResults(Role), asyncHandler(async (req, res) => {
		res.status(200).json(res.advancedResults);
	}))
}