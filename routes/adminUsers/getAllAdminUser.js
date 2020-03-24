const AdminUser = require("../../models/AdminUser");
const Role = require("../../models/Role");
const advancedResults = require("../../middleware/advancedResults");
const asyncHandler = require("../../middleware/async");
const { protect, authorize } = require("../../middleware/auth");


module.exports = (app) => {
	app.get("/adminUsers", protect, authorize("admin"), advancedResults(AdminUser, Role, "role"), asyncHandler(async (req, res, next) => {
		const value = res.advancedResults;
		const data = value.data.map(item => ({...item._doc, role: item._doc.role.role }));
		const result = {...value, data };
		res.status(200).json( result);
	}))
}