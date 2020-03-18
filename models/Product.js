const { Schema, model, Types } = require("mongoose");


const schemaProduct = Schema({
	uniquePC: {
		type: String,
		trim: true,
		unique: true,
		required: true,
	},
	ru: {
		type: Boolean,
		default: false
	},
	ua: {
		type: Boolean,
		default: false
	},
	category: {
		type: Types.ObjectId,
		ref: "Category"
	},
	content: {
		ua: {
			brand: {
				type: String,
				trim: true,
				uppercase: true,
				minlength: 3,
			},
			productName: {
				type: String,
				unique: true,
				trim: true,
				minlength: 3,
			},
			INN:{
				type: String,
				trim: true,
				uppercase: true,
				minlength: 3
			},
			OTC_RX: {
				type: String,
				enum: ["OTC", "RX"],
				uppercase: true
			},
			dosage: {
				type: String,
				trim: true,
				minlength: 3
			},
			form: {
				type: String,
				trim: true,
				minlength: 3,
			},
			ATC_5: {
				type: String,
				trim: true,
				minlength: 3
			},
			description: {
				type: String,
				trim: true,
				minlength: 3
			},
			shortDescription: {
				type: String,
				trim: true,
				minlength: 3
			},
		},
		ru: {
			brand: {
				type: String,
				trim: true,
				uppercase: true,
				minlength: 3,
			},
			productName: {
				type: String,
				unique: true,
				trim: true,
				minlength: 3,
			},
			INN:{
				type: String,
				trim: true,
				uppercase: true,
				minlength: 3
			},
			OTC_RX: {
				type: String,
				enum: ["OTC", "RX"],
				uppercase: true
			},
			dosage: {
				type: String,
				trim: true,
				minlength: 3
			},
			form: {
				type: String,
				trim: true,
				minlength: 3,
			},
			ATC_5: {
				type: String,
				trim: true,
				minlength: 3
			},
			description: {
				type: String,
				trim: true,
				minlength: 3
			},
			shortDescription: {
				type: String,
				trim: true,
				minlength: 3
			},
		},
	},
	photo: {
		type: [String],
		default: ["no-photo.jpg"]
	},
	price: {
		type: Number,
		min: 0,
	}
});



module.exports = model("Product", schemaProduct);