const Product = require("../../models/Product");
const Category = require("../../models/Category");
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require("../../middleware/async");

// lan: all|ru|ua
module.exports = (app) => {
	app.get("/:lan/products/:id", asyncHandler(async (req, res, next) => {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
		};
		const category = await Category.findById(product.category);

		if(req.params.lan === "all"){
			const data = {cord: product.uniquePC,
				price: product.price,
				photo: product.photo,
				ua: {...product.content.ua, category: category.content.ua.title},
				ru: {...product.content.ru, category: category.content.ru.title}};

			return res.status(200).json({ success: true, data });
		};
		const data = {...product.content[req.params.lan], price: product.price, cord: product.uniquePC,
			category: category.content[req.params.lan].title, photo: product.photo};
		return res.status(200).json({ success: true, data });
	}))
}