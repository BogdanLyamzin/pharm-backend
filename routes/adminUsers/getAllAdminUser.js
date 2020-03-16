const AdminUser = require("../../models/adminUser");
const Role = require("../../models/role");
const advancedResults = require("../../middleware/advancedResults");
const asyncHandler = require("../../middleware/async")


module.exports = (app) => {
	app.get("/adminUsers", advancedResults(AdminUser, Role, "role"), asyncHandler(async (req, res, next) => {
		const value = res.advancedResults;
		const data = value.data.map(item => ({...item._doc, role: item._doc.role.role }));
		const result = {...value, data };
		res.status(200).json( result);
	}))
}