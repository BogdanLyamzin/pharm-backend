const Role = require("../models/role");

module.exports = async function(role){
	try {
		const roles = await Role.find();
		const arrayRoles = roles.map(item => item.role);
		if(!arrayRoles.includes(role)){
			const newRole = new Role({role});
			await newRole.save();
		}
	}catch (err) {
		console.log(err.message)
	}
}
