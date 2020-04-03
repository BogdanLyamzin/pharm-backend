const AdminUser = require("../../models/AdminUser");
const Role = require("../../models/Role");
const sendMail = require("../../utils/sendMail");
const checkRole = require("../../utils/checkRole");
const { letterUpdateUser } = require("../../configs/mail");
const asyncHandler = require("../../middleware/async");
const ErrorResponse = require('../../utils/errorResponse');
const { protect } = require("../../middleware/auth");

module.exports = (app) => {
	app.put("/adminUsers/:id", protect, asyncHandler(async (req, res, next) => {
		const id = req.params.id;
		const qerBody = {...req.body};

		const adminUser = await AdminUser.findById(id).populate({path: "role", select: "role"});

		if (!adminUser) {
			return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
		};

		if(adminUser._id.toString() !== req.adminUser._id.toString() || req.user.role.role !== 'admin'){
			new ErrorResponse(`User ${req.user.id} is not authorized to update this data`, 401)
		}

		if(qerBody.role){
			checkRole(qerBody.role);
			const role = await Role.find({role: qerBody.role});
			qerBody.role = role._id;
		}

		if(qerBody.password && qerBody.password === qerBody.confirm){
			await AdminUser.findByIdAndUpdate(id, qerBody);
		}else if (!qerBody.password){
			await AdminUser.findByIdAndUpdate(id, qerBody);
		}else {
			return next(new ErrorResponse("Please check password and clearly confirm it.", 400))
		};

		const updateUser = await AdminUser.findById(id).populate({path: "role", select: "role"});

		const data = {...updateUser._doc, role: updateUser._doc.role.role };

		res.status(201).json({
			success: true,
			data
		});
		const htmlBody = letterUpdateUser(data.name);
		sendMail({
			email: data.email,
			subject: 'Your account has been updated',
			html: htmlBody
		});
	}))
}