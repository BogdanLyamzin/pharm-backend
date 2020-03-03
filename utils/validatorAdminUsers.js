const { body } = require('express-validator/check');
const AdminUser = require("../models/adminUser");

exports.adminUsersValidators = [
	body("email").isEmail().withMessage("Invalid email!")
			.custom(async 	(value, {req}) =>{
				try {
					const user = await AdminUser.findOne({email: value});
					if(user){
						return Promise.reject("User with this email already exists.")
					}

				}catch (e) {
					console.log(e)
				}
			})
			.normalizeEmail(),
	body("password", "Invalid password.")
			.isLength({min:6, max:56})
			.isAlphanumeric()
			.trim(),
	body("confirm")
			.custom((value, {req}) =>{
				if(value !== req.body.password){
					throw new Error("Passwords did not match.")
				}
				return true
			})
			.trim(),
	body("name").isLength({min: 2})
			.withMessage("Invalid name.")
			.trim(),
	body("role").isLength({min: 2})
			.withMessage("Invalid role.")
			.trim()

];