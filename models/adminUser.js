const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcrypt");
const { name, password, email, department, phone } = require("../utils/validatorPattern");
const createValidate = require("../utils/validator");

const funValidator = createValidate( name, password, email, department, phone);

const schemaAdminUser = Schema({
	name: {
		type: String,
		required: [true, name.required],
		trim: true,
		lowercase: true,   // in this way or we will need to add additional field to sort and search
		validate: funValidator.name,
	},
	phone: {
		type: String,
		required: [true, phone.required],
		trim: true,
		validate: funValidator.phone,
	},
	department: {
		type: String,
		trim: true,
		lowercase: true,
		validate: funValidator.department,
	},
	role: {
		type: Types.ObjectId,
		ref: "Role"
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		required: [true, email.required],
		unique: true,
		validate: funValidator.email,

	},
	password: {
		type: String,
		trim: true,
		required: [true, password.required],
		select: false,
		validate: funValidator.password,
	}
});

// Encrypt password using bcrypt
schemaAdminUser.pre('save', async function(next) {
	if (!this.isModified('password')) {
		next();	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
schemaAdminUser.methods.matchPassword = async function(enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};



module.exports = model("AdminUser", schemaAdminUser);
