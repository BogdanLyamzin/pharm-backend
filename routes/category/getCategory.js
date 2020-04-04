const Category = require("../../models/Category");
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require("../../middleware/async");
const { protect } = require("../../middleware/auth");
const transformIntlObj = require("../../utils/transformIntlObj");

// lan: all|ru|ua
module.exports = (app) => {
	app.get("/:lan/categories/:id", protect, asyncHandler(async (req, res, next) => {
		const category = await Category.findById(req.params.id);

		if (!category) {
			return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
		};
		const data = transformIntlObj(category, req.params.lan);

		return res.status(200).json({ success: true, data });
	}))
}
