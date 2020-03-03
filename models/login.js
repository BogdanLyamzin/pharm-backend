const pattern = require("../utils/validatorPattern");
const {Schema, Types,  model} = require("mongoose");

const loginShema = new Schema({
	email: {
		type: Types.ObjectId,
		ref: "AdminUser"
	},
	password: {
		type: Types.ObjectId,
		ref: "AdminUser"
	},
});

module.exports =  model("Login", loginShema);
