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
		minlength: 3,
	},
	productName: {
		type: String,
		intl: true,
		trim: true,
		minlength: 3,
	},
	INN:{
		type: String,
		intl: true,
		trim: true,
		uppercase: true,
		minlength: 3
	},
	dosage: {
		type: String,
		intl: true,
		trim: true,
		minlength: 3
	},
	form: {
		type: String,
		intl: true,
		trim: true,
		minlength: 3,
	},
	ATC_5: {
		type: String,
		intl: true,
		trim: true,
		minlength: 3
	},
	description: {
		type: String,
		intl: true,
		trim: true,
		minlength: 3
	},
	shortDescription: {
		type: String,
		intl: true,
		trim: true,
		minlength: 3
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

schemaProduct.plugin(mongooseIntl, { languages: ['ru', 'uk'], defaultLanguage: 'ru' });

module.exports = model("Product", schemaProduct);
