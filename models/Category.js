const { Schema, model, Types } = require("mongoose");
const mongooseIntl = require('mongoose-intl');

const schemaCategory = Schema({
	uniqueCC: {
		type: String,
		trim: true,
		unique: true,
		required: [true, "Please add unique category cord"],
	},
	language: {
		type: String,
		intl: true,
		default: " "
	},
	categoryParent: {
		type: Types.ObjectId,
		ref: "Category"
	},
	title: {
		type: String,
		intl: true,
		trim: true,
		minlength: [3, "Too short title (min length 3 singles)."],
	},
	description: {
		type: String,
		intl: true,
		trim: true,
		minlength: [12, "Too short description (min length 12 singles)."],
	},
	shortDescription:{
		type: String,
		intl: true,
		trim: true,
		minlength: [12, "Too short description (min length 12 singles)."],
		maxlength: [100, "Too long description (max 100 singles)."],
	},
	photo: {
		type: [String],
		default: ['no-photo.jpg']
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	author: {
		type: Types.ObjectId,
		ref: 'AdminUser',
	}
},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

module.exports = model("Category", schemaCategory);
