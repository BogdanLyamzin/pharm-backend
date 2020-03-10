const AdminUser = require("../../models/adminUser");
const bcrypt = require("bcrypt");
const pattern = require("../../utils/validatorPattern");
const validator = require("../../utils/validator")
const sendMail = require("../../utils/sendMail");
const checkRole = require("../../utils/checkRole");
const { letterUpdateUser } = require("../../configs/mail")

module.exports = (app) => {
	app.put("/adminUsers/:id", async (req, res) => {
		try {
			const {password, confirm} = req.body;
			const id = req.params.id;

			if(req.body.role){
				checkRole(req.body.role)
			}

			if(password && password === confirm){
				validator(password, pattern.password.reg, pattern.password.message);
				const hashPassword = await bcrypt.hash(password, 10);
				await AdminUser.findByIdAndUpdate(id, {...req.body, password: hashPassword});
			}else if (!password){
				await AdminUser.findByIdAndUpdate(id, {...req.body});
			};
			const adminUser = await AdminUser.findById(id);
			await AdminUser.findByIdAndUpdate(id, {lowerName: adminUser.name.toLowerCase(),
				lowerDepartment: adminUser.department.toLowerCase()});

			const result = {
				name: adminUser.name,
				_id: adminUser._id,
				email: adminUser.email,
				phone: adminUser.phone,
				department: adminUser.department,
				role: adminUser.role.role
			};

			res.send({
				status: "Success",
				result
			});
			const pass = password || "old password"; // ???How to get correct password?:(

			const htmlBody = letterUpdateUser(result.name, pass);
			sendMail(result.name, result.email, "Inform letter", htmlBody);
		}catch (err) {
			res.send({
				status: "Error",
				message: err.message
			})
		}
	})
}