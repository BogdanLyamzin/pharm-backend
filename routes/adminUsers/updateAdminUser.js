const AdminUser = require("../../models/adminUser");
const bcrypt = require("bcrypt");
const pattern = require("../../utils/validatorPattern");
const sendMail = require("../../utils/sendMail");
const checkRole = require("../../utils/checkRole");
const { letterUpdateUser } = require("../../configs/mail")

module.exports = (app) => {
	app.put("/adminUser/:id", async (req, res) => {
		try {
			const {password, confirm} = req.body;
			const id = req.params.id;

			if(req.body.role){
				checkRole(req.body.role)
			}

			if(password && password === confirm){
				if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[\w!@#\$%\^&-\*]{6,}$/.test(password)) {
					throw new Error('Password is invalid')
				}
				const hashPassword = await bcrypt.hash(password, 10);
				await AdminUser.findByIdAndUpdate(id, {...req.body, password: hashPassword});
			}else if (!password){
				await AdminUser.findByIdAndUpdate(id, {...req.body});
			};
			const result = await AdminUser.findById(id);
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