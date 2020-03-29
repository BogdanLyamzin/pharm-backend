const { Schema, model, Types } = require("mongoose");
const mongooseIntl = require('mongoose-intl');


const schemaTest = Schema({
	uniquePC: {
		type: String,
		trim: true,
		unique: true,
		required: [true, "Please add unique product cord"],
	},
	language: {
		type: String,
		intl: true,
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
	},
},
{
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
});



schemaTest.plugin(mongooseIntl, { languages: ['ru', 'uk'], defaultLanguage: 'ru' });



module.exports = model("Test", schemaTest);