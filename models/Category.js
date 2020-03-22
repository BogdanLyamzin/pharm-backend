const { Schema, model, Types } = require("mongoose");


const schemaCategory = Schema({
	uniqueCC: {
		type: String,
		trim: true,
		unique: true,
		required: [true, "Please add unique category cord"],
	},
	ru: {
		type: Boolean,
		default: false
	},
	ua: {
		type: Boolean,
		default: false
	},
	categoryParent: {
		type: Types.ObjectId,
		ref: "Category"
	},
	content: {
		ua: {
			title: {
				type: String,
				unique: true,
				trim: true,
			},
			description: {
				type: String,
				trim: true,
				minlength: [12, "Too short description (min length 12 singles)."],
			},
			shortDescription:{
				type: String,
				trim: true,
				minlength: [12, "Too short description (min length 12 singles)."],
				maxlength: [100, "Too long description (max 100 singles)."],
			},
		},
		ru: {
			title: {
				type: String,
				unique: true,
				trim: true,
			},
			description: {
				type: String,
				trim: true,
				minlength: [12, "Too short description (min length 12 singles)."],
			},
			shortDescription:{
				type: String,
				trim: true,
				minlength: [12, "Too short description (min length 12 singles)."],
				maxlength: [100, "Too long description (max 100 singles)."],
			},
		}
	},
	photo: {
		type: [String],
		default: ['no-photo.jpg']
	},
});

module.exports = model("Category", schemaCategory);