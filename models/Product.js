const { Schema, model, Types } = require("mongoose");
const mongooseIntl = require('mongoose-intl');

const schemaProduct = Schema({
	uniquePC: {
		type: String,
		trim: true,
		unique: true,
		required: [true, "Please add unique product cord"],
	},
	language: {
		type: String,
		default: " ",
		intl: true,
	},
	category: {
		type: Types.ObjectId,
		ref: "Category",
		required: [true, "Please choose category."],
	},
	OTC_RX: {
		type: String,
		enum: ["OTC", "RX"],
		uppercase: true
	},
	brand: {
		type: String,
		intl: true,
		trim: true,
		uppercase: true,
		minlength: [3, "Too short name (min length 3 singles)."],
	},
	productName: {
		type: String,
		intl: true,
		trim: true,
		minlength: [3, "Too short name (min length 3 singles)."],
	},
	INN:{
		type: String,
		intl: true,
		trim: true,
		uppercase: true,
		minlength: [3, "Too short name (min length 3 singles)."],
	},
	dosage: {
		type: String,
		intl: true,
		trim: true,
		minlength: [3, "Too short value (min length 3 singles)."],
	},
	form: {
		type: String,
		intl: true,
		trim: true,
		minlength: [3, "Too short value (min length 3 singles)."],
	},
	ATC_5: {
		type: String,
		intl: true,
		trim: true,
		minlength: [3, "Too short value (min length 3 singles)."],
	},
	description: {
		type: String,
		intl: true,
		trim: true,
		minlength: [12, "Too short description (min length 12 singles)."],
	},
	shortDescription: {
		type: String,
		intl: true,
		trim: true,
		minlength: [12, "Too short description (min length 12 singles)."],
		maxlength: [100, "Too long description (max 100 singles)."],
	},
	photo: {
		type: [String],
		default: ["no-photo.jpg"]
	},
	price: {
		type: Number,
		min: 0,
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

module.exports = model("Product", schemaProduct);
