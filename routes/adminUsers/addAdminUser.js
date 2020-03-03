const AdminUser = require("../../models/adminUser");
const bcrypt = require("bcrypt");
const sendMail = require("../../utils/sendMail");
const Role = require("../../models/role");

module.exports = (app) => {
	app.post("/adminUser", async (req, res) => {
		try {
			if(req.password === req.confirm){
				const {password, name, email} = req.body;
				const candidate = await AdminUser.findOne({ email });
				if(candidate){
					throw new Error( "This user already exists!.");
				};
				const htmlBody = `<h2>Hello, ${name}</h2>
							  <p>Your account was created on Pharm.</p>
							  <p>Login: ${name}</p>
							  <p>Password: ${password}</p>`;

				const hashPassword = await bcrypt.hash(password, 10);
				const role = await Role.findOne({role: req.body.role});
				const newUser = {...req.body, password: hashPassword, role: role._id};

				const user = new AdminUser(newUser)
				const result = await user.save();

				res.send({
					status: "Success",
					result
				});
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