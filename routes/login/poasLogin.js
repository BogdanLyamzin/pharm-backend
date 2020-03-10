const AdminUser = require("../../models/AdminUser");

module.exports = (app) => {
	app.post("/login", async (req, res) => {

		try {
			const {email, password} = req.body;
			const adminUser = await AdminUser.findOne({ email });
			if(!adminUser){
				throw new Error("User is not found!")
			};
			const isMatch = await bcrypt.compare(password, adminUser.password);
			if(!isMatch){
				throw new Error("Wrong password!")
			};

			// const token = jwt.sign(
			// 		{adminUserId: adminUser.id},
			// 		config.get("jwtSecret"),
			// 		{expiresIn: "1h"}
			// );
			// res.json({token, adminUserId: adminUser.id})


		}catch (err) {
			res.send({
				status: "Error",
				message: err.message
			})
		}
	});
}