const { Schema, model, Types } = require("mongoose");
const pattern = require("../utils/validatorPattern");
const validator = require("../utils/validator");

const schemaAdminUser = Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		validate(value){validator(value, pattern.name.reg, pattern.name.message)},
	},
	phone: {
		type: String,
		required: true,
		trim: true,
		validate(value){validator(value, pattern.phone.reg, pattern.phone.message)},
	},
	department: {
		type: String,
		trim: true,
		validate(value){validator(value, pattern.department.reg, pattern.department.message)},
	},
	role: {
		type: Types.ObjectId,
		ref: "Role"
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		required: true,
		unique: true,
		validate(value){validator(value, pattern.email.reg, pattern.email.message)},
	},
	password: {
		type: String,
		trim: true,
		required: true,
	}
});

module.exports = model("AdminUser", schemaAdminUser);
