const { Schema, model, Types } = require("mongoose");
const pattern = require("../utils/validatorPattern");


const schemaAdminUser = Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		validate(value) {
			if (!/^[A-Za-zА-Яа-я\-]{2,}\s[A-Za-zА-Яа-я\-\s]{2,}$/.test(value)) {
				throw new Error('Name is invalid')
			}
		},
		// match: `/^${pattern.name}$/`,
	},
	phone: {
		type: String,
		required: true,
		trim: true,
		validate(value) {
			if (!/^[+\s]?\(?\s?\d*[\s\-]?\)?\(?\s?\d{3,}[\s\-]?\)?\s?\d{1,3}[\s\-]?\d{2}[\s\-]?\d{2}$/.test(value)) {
				throw new Error('Phone number is invalid')
			}
		},
		// match: `/^${pattern.phone}$/`,
	},
	department: {
		type: String,
		trim: true,
		validate(value) {
			if (!/^[A-Za-z\-]{2,}[A-Za-z\-\s]*$/.test(value)) {
				throw new Error('Department is invalid')
			}
		},
		// match: `/^${pattern.department}$/`,
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
		validate(value) {
			if (!/^[a-z0-9]+[\w\-\.]*[a-z0-9]+\@[a-z0-9]+[\w\-\.]*[a-z0-9]+\.[a-z]{2,}$/.test(value)) {
				throw new Error('Email is invalid')
			}
		},
		// match: `/^${pattern.email}$/`,
	},
	password: {
		type: String,
		trim: true,
		required: true,
		// match: `/^${pattern.password}$/`,
	}

});

module.exports = model("AdminUser", schemaAdminUser);
