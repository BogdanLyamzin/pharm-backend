const { Schema, model, Types } = require("mongoose");


const schemaCategory = Schema({
	uniqueCC: {
		type: String,
		trim: true,
		unique: true,
		required: true,
	},
	categoryTitle: {
		ua: {
			type: String,
			trim: true,
		},
		ru: {
			type: String,
			trim: true,
		},
	},
	categoryParent: {
		type: Types.ObjectId,
		ref: "Category"
	},
	description: {
		ua: String,
		ru: String,
	},
	photo: {
		ua: {
			type: String,
			default: 'no-photo.jpg'
		},
		ru:{
			type: String,
			default: 'no-photo.jpg'
		}

	}

});

schemaProduct.methods.matchUniqueCC = async function(enteredcord) {
	return enteredcord === this.uniqueCC;
};

module.exports = model("Category", schemaCategory);