const { Schema, model } = require("mongoose");
const { role } = require("../utils/validatorPattern");
const createValidate = require("../utils/validator");
const mongooseIntl = require('mongoose-intl');

const funValidator = createValidate(role);

const schemaRole = new Schema({
	role: {
		type: String,
		enum: ["owner", "admin", "content manager"],
		required: [true,  role.required],
		unique: true,
		validate: funValidator.role,
	},
	allowPages: [String],
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = model("Role", schemaRole);
