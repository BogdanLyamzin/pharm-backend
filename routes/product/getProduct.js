const Product = require("../../models/Product");
const Category = require("../../models/Category");
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require("../../middleware/async");
const transformIntlObj = require("../../utils/transformIntlObj");
const { protect } = require("../../middleware/auth");

// lan: all|ru|uk
module.exports = (app) => {
	app.get("/:lan/products/:id", protect, asyncHandler(async (req, res, next) => {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
		};
		const data = transformIntlObj(product, req.params.lan);

		return res.status(200).json({ success: true, data });
	}))
}
