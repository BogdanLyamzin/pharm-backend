const { Schema, model, Types } = require("mongoose");
const schemaRole = new Schema({
	role: {
		type: String,
		required: true,
	},
	allowPages: [String]

});

module.exports = model("Role", schemaRole);