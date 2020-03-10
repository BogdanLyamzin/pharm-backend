const AdminUser = require("../../models/adminUser");
const bcrypt = require("bcrypt");
const sendMail = require("../../utils/sendMail");
const { letterAddUser } = require("../../configs/mail");
const checkRole = require("../../utils/checkRole");
const pattern = require("../../utils/validatorPattern");
const validator = require("../../utils/validator")
const Role = require("../../models/role");


module.exports = (app) => {
	app.post("/adminUsers", async (req, res) => {
		try {
			if(req.password === req.confirm){
				const {password, name, email} = req.body;

				validator(password, pattern.password.reg, pattern.password.message);

				const candidate = await AdminUser.findOne({ email });
				if(candidate){
					throw new Error( "This user already exists!.");
				};

				checkRole(req.body.role);

				const hashPassword = await bcrypt.hash(password, 10);
				const role = await Role.findOne({role: req.body.role});
				const user = new AdminUser({...req.body,
					password: hashPassword,
					role: role._id,
					lowerName: req.body.name.toLowerCase(),
					lowerDepartment: req.body.department.toLowerCase()
				})
				const userSave = await user.save();
				const result = {
					name: userSave.name,
					_id: userSave._id,
					email: userSave.email,
					phone: userSave.phone,
					department: userSave.department,
					role: userSave.role.role
				};

				res.send({
					status: "Success",
					result
				});
				const htmlBody = letterAddUser(name, password);
				sendMail(name, email, "Inform letter", htmlBody);
			}
		}catch (err) {
			res.send({
				status: "Error",
				message: err.message

			})
		}
	})
}