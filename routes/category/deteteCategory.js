const Category = require("../../models/Category")
const Product = require("../../models/Product");
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require("../../middleware/async");


module.exports = (app) => {
	app.delete("/categories/:id", asyncHandler(async (req, res, next) => {
		const category = await Category.findById(req.params.id);
		if (!category) {
			return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
		};
		//All products from this category will be deleted
		await category.remove();

		res.status(200).json({ success: true, data: {} });
	}))
}