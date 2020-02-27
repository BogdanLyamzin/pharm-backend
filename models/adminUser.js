const { Schema, model, Types } = require("mongoose");

const schemaAdminUser = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		minlength: 6,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	phone: {
		type: Number,
		required: true
	},
	department: String,
	role: {
		type: Types.ObjectId,
		ref: "Role"
	}

});

module.exports = model("AdminUser", schemaAdminUser);