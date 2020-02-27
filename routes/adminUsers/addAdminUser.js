const AdminUser = require("../../models/adminUser");
const Role = require("../../models/role");
const bcrypt = require("bcryptjs");
const sendMail = require("../../utils/sendMail");
const { validationResult } = require('express-validator/check');
const { adminUsersValidators } = require("../../utils/validatorAdminUsers")

module.exports = (app) => {
	app.post("/adminUser", adminUsersValidators, async (req, res) => {
		try {
			const errors = validationResult(req);
			if(!errors.isEmpty()){
				res.send({
					status: "Error",
					message: errors.array() ///???
				})
				return
			};
			const {password, name, email, role} = req.body;
			const userRole = await Role.findById(role).role;
			const htmlBody = `<h2>Hello, ${name}</h2>
                              `


			const hashPassword = await bcrypt.hash(password, 10)

			const newUser = {...req.body, password: hashPassword};
			delete newUser.id;
			const user = new AdminUser(newUser)
			const result = await user.save();
			res.send({
				status: "Success",
				result
			});
			sendMail(name, email, "", htmlBody);
		}catch (err) {
			res.send({
				status: "Error",
				message: err.message
			})
		}
	})
}