const Category = require("../../models/Category");
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require("../../middleware/async");

// lan: all|ru|ua
module.exports = (app) => {
	app.get("/:lan/categories/:id", asyncHandler(async (req, res, next) => {
		const category = await Category.findById(req.params.id);

		if (!category) {
			return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
		};
		const title = {}
		if(category.categoryParent){
			const categoryParent = await Category.findById(category.categoryParent);
			title.ua = categoryParent.content.ua.title || "";
			title.ru = categoryParent.content.ru.title || "";
		};

		if(req.params.lan === "all"){
			const data = {cord: category.uniqueCC,
				photo:category.photo,
				ua: {...category.content.ua},
				ru: {...category.content.ru}};

			if(Object.keys(title).length){
				data.ua.parentCategory = title.ua;
				data.ru.parentCategory = title.ru;			}

			return res.status(200).json({ success: true, data });
		};

		const data = {...category.content[req.params.lan],
			cord: category.uniqueCC,
			photo:category.photo};
		if(Object.keys(title).length){
			data.parentCategory = title[req.params.lan];
		}

		return res.status(200).json({ success: true, data });
	}))
}