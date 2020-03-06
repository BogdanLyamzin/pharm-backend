const AdminUser = require("../../models/adminUser");
const Role = require("../../models/role")

module.exports = (app) => {
	app.get("/adminUser", async (req, res) => {

		try {
			const match = req.query;
			delete match.sortBy;
			delete match.limit;
			delete match.skip;
			if(req.query.role) {
				const role = await Role.findOne({role: req.query.role });
				match.role = role._id;
			}
			console.log(match)
			const sort = {}; //GET /adminUser?sortBy=field:desc
			if (req.query.sortBy) {
				const parts = req.query.sortBy.split(':')
				sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
			};

			const adminUsers = await AdminUser.find(match).populate({
				path: "role",
				select: "role",
				options: {
					limit: parseInt(req.query.limit),
					skip: parseInt(req.query.skip),
					sort
				}
			});
			console.log(adminUsers)

			const users = adminUsers.map((user) => ({
				name: user.name,
				_id: user._id,
				email: user.email,
				phone: user.phone,
				password: "",
				department: user.department,
				role: user.role.role }));

			res.send({
				status: "Success",
				result: users
			});
		}catch (err) {
			res.send({
				status: "Error",
				message: err.message
			})
		}
	})
}