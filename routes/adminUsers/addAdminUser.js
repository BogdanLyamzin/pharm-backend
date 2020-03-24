const AdminUser = require("../../models/AdminUser");
const sendMail = require("../../utils/sendMail");
const { letterAddUser } = require("../../configs/mail");
const checkRole = require("../../utils/checkRole");
const Role = require("../../models/Role");
const asyncHandler = require("../../middleware/async");
const ErrorResponse = require('../../utils/errorResponse');
const { protect, authorize } = require("../../middleware/auth");

// @access   role=admin???
module.exports = (app) => {
	app.post("/adminUsers", protect, authorize("admin"), asyncHandler(async (req, res, next) => {
		if(req.password === req.confirm){
			const {password, name, email} = req.body;
			checkRole(req.body.role);
			const role = await Role.findOne({role: req.body.role});
			const user = new AdminUser({...req.body, role: role._id})
			const userSave = await user.save();
			const data = {...userSave._doc, role: userSave._doc.role.role };

			res.status(201).json({
				success: true,
				data
			});
			const htmlBody = letterAddUser(name, email, password);
			sendMail({
				email,
				subject: 'Your account has been created',
				html: htmlBody
			});
		}else {
			return next(new ErrorResponse("Please check password and clearly confirm it.", 400))
		}
	}))
}