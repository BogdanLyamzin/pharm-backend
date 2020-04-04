const AdminUser = require("../../models/AdminUser");
const sendMail = require("../../utils/sendMail");
const { letterAddUser } = require("../../configs/mail");
const Role = require("../../models/Role");
const asyncHandler = require("../../middleware/async");
const ErrorResponse = require('../../utils/errorResponse');
const { protect, authorize } = require("../../middleware/auth");

// @access   role=admin???
module.exports = (app) => {
	app.post("/adminUsers", protect, authorize("admin"), asyncHandler(async (req, res, next) => {

		if(req.body.password === req.body.confirm){
			const {password, name, email} = req.body;
			const role = await Role.findOne({role: req.body.role});
			if(!role._id){
				return next(new ErrorResponse(`The role ${req.body.role} not found. At first add it to BD`, 401))
			}
			const user = new AdminUser({...req.body, role: role._id})
			const userSave = await user.save();
			const data = {...userSave._doc, role: role.role };

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