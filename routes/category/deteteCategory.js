const Category = require("../../models/Category")
const Product = require("../../models/Product");
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require("../../middleware/async");
const { protect } = require("../../middleware/auth");


module.exports = (app) => {
	app.delete("/categories/:id", protect, asyncHandler(async (req, res, next) => {
		const category = await Category.findById(req.params.id);
		if (!category) {
			return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
		};
		const products = await Product.find({category: req.params.id});
		const categoryChildren = await Category.find({categoryParent: req.params.id});
		if(products.length > 0 && categoryChildren.length > 0){
			return next(new ErrorResponse(`This category cannot be deleted because it contains products or/and subcategories`, 400));
		}
		await category.remove();
		res.status(200).json({ success: true, data: {} });
	}))
}