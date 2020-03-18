const { Schema, model, Types } = require("mongoose");


const schemaProduct = Schema({
	uniquePC: {
		type: String,
		trim: true,
		unique: true,
		required: true,
	},
	brand: {
		ua: {
			type: String,
			trim: true,
			uppercase: true,
			minlength: 3,
		},
		ru: {
			type: String,
			trim: true,
			uppercase: true,
			minlength: 3
		},
	},
	productName: {
		ua: {
			type: String,
			unique: true,
			trim: true,
			minlength: 3,
		},
		ru: {
			type: String,
			unique: true,
			trim: true,
			minlength: 3
		},
	},
	INN:{
		ua: {
			type: String,
			trim: true,
			uppercase: true,
			minlength: 3
		},
		ru: {
			type: String,
			trim: true,
			uppercase: true,
			minlength: 3
		},
	},
	category: {
		type: Types.ObjectId,
		ref: "Category"
	},
	OTC_RX: {
		ua: {
			type: String,
			enum: ["OTC", "RX"],
			uppercase: true
		},
		ru: {
			type: String,
			enum: ["OTC", "RX"],
			uppercase: true
		}
	},
	dosage: {
		ua: {
			type: String,
			trim: true,
			minlength: 3
		},
		ru: {
			type: String,
			trim: true,
			minlength: 3
		},
	},
	form: {
		ua: {
			type: String,
			trim: true,
			minlength: 3,
		},
		ru: {
			type: String,
			trim: true,
			minlength: 3
		},
	},
	ATC_5: {
		ua: {
			type: String,
			trim: true,
			minlength: 3
		},
		ru: {
			type: String,
			trim: true,
			minlength: 3
		},
	},
	description: {
		ua: {
			type: String,
			trim: true,
			minlength: 3
		},
		ru: {
			type: String,
			trim: true,
			minlength: 3
		},
	},
	shortDescription: {
		ua: {
			type: String,
			trim: true,
			minlength: 3
		},
		ru: {
			type: String,
			trim: true,
			minlength: 3
		},
	},
	photo: {
		ua: {
			type: String,
			default: 'no-photo.jpg'
		},
		ru: {
			type: String,
			default: 'no-photo.jpg'
		},
	},
	price: {
		ua: {
			type: Number,
			min: 0,
		},
		ru: {
			type: Number,
			min: 0,
		}
	}

});

schemaProduct.methods.matchUniquePC = async function(enteredcord) {
	return enteredcord === this.uniquePC;
};


module.exports = model("Product", schemaProduct);