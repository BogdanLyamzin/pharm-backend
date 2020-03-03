const AdminUser = require("../../models/adminUser");
const bcrypt = require("bcrypt");
const sendMail = require("../../utils/sendMail");
const { letterAddUser } = require("../../configs/mail");
const checkRole = require("../../utils/checkRole");
const Role = require("../../models/role");
const Login = require("../../models/login");

module.exports = (app) => {
	app.post("/adminUser", async (req, res) => {
		try {
			if(req.password === req.confirm){
				const {password, name, email} = req.body;
				const candidate = await AdminUser.findOne({ email });
				if(candidate){
					throw new Error( "This user already exists!.");
				};
				checkRole(req.body.role);
				const hashPassword = await bcrypt.hash(password, 10);
				const role = await Role.findOne({role: req.body.role});
				const user = new AdminUser({...req.body, password: hashPassword, role: role._id})
				const result = await user.save();
				const newLogin = new Login({_id: result._id, email: result._id, password: result._id});
				const login = await newLogin.save();
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