const Product = require("../../models/Product");
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require("../../middleware/async");
const { protect } = require("../../middleware/auth");


module.exports = (app) => {
	app.delete("/products/:id", protect, asyncHandler(async (req, res, next) => {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
		};
		await product.remove();
		res.status(200).json({ success: true, data: {} });
	}))
}