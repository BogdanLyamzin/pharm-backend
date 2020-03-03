const { Schema, model, Types } = require("mongoose");
const pattern = require("../utils/validatorPattern");
const loginShema = require("./login");

const schemaAdminUser = Schema({
	name: {
		type: String,
		required: true,
		// match: `/^${pattern.name}$/`,
	},
	phone: {
		type: String,
		required: true,
		// match: `/^${pattern.phone}$/`,
	},
	department: {
		type: String,
		// match: `/^${pattern.department}$/`,
	},
	role: {
		type: Types.ObjectId,
		ref: "Role"
	},
	email: {
		type: String,
		required: true,
		unique: true,
		// match: `/^${pattern.email}$/`,
	},
	password: {
		type: String,
		required: true,
		// match: `/^${pattern.password}$/`,
	}

});

module.exports = model("AdminUser", schemaAdminUser);
