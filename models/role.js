const { Schema, model } = require("mongoose");
const schemaRole = new Schema({
	role: {
		type: String,
		enum: ["owner", "admin", "content manager"],
		required: true,
		unique: true
	},
	allowPages: [String]

});

module.exports = model("Role", schemaRole);