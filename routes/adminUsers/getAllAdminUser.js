const AdminUser = require("../../models/adminUser");
const Role = require("../../models/role")

module.exports = (app) => {
	app.get("/adminUsers", async (req, res) => {

		try {
			const sort = {}; //GET /adminUser?sortBy=field:desc
			if(req.query.sortBy){
				const parts = req.query.sortBy.split(':');
				sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
				if(sort.name){
					sort.lowerName = sort.name;
					delete sort.name
				};
				if(sort.department){
					sort.lowerDepartment = sort.department;
					delete sort.department
				};
			};

			console.log(sort)


			const limit = parseInt(req.query.limit);
			const skip = parseInt(req.query.skip);
			const match = req.query;
			delete match.sortBy;
			delete match.limit;
			delete match.skip;
			if(req.query.role) {
				const role = await Role.findOne({role: req.query.role });
				match.role = role._id;
			};

			const adminUsers = await AdminUser.find(match)
					.sort(sort)
					.limit(limit)
					.skip(skip)
					.populate({
				path: "role",
				select: "role"
			});

			const users = adminUsers.map((user) => ({
				name: user.name,
				_id: user._id,
				email: user.email,
				phone: user.phone,
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