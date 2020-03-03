const AdminUser = require("../../models/adminUser");
const bcrypt = require("bcrypt");
const sendMail = require("../../utils/sendMail");
const { validationResult } = require('express-validator/check');
const { adminUsersValidators } = require("../../utils/validatorAdminUsers")

module.exports = (app) => {
	app.put("/adminUser/:id", adminUsersValidators, async (req, res) => {
		try {
			const {password, name, email} = req.body;
			const htmlBody = `<h2>Hello, ${name}</h2>
							  <p>Your data was updated on Pharm.</p>
							  <p>Login: ${name}</p>
							  <p>Password: ${password}</p>
                              `

			const hashPassword = await bcrypt.hash(password, 10);

			const id = req.params.id;
			const newUser = {...req.body, password: hashPassword};
			delete newUser.id;
			const result = await AdminUser.findByIdAndUpdate(id, newUser);

			res.send({
				status: "Success",
				result
			});
			sendMail(name, email, "Inform letter", htmlBody);
		}catch (err) {
			res.send({
				status: "Error",
				message: err.message
			})
		}
	})
}