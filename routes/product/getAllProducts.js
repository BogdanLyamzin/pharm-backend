const Product = require("../../models/Product");
const Category = require("../../models/Category");
const advancedResults = require("../../middleware/advancedResults");
const asyncHandler = require("../../middleware/async");
const transformIntlObj = require("../../utils/transformIntlObj");
const { protect } = require("../../middleware/auth");

module.exports = (app) => {
	app.get("/:lan/products", protect, advancedResults(Product, Category, "category", "title"), asyncHandler(async (req, res, next) => {

		const data = res.advancedResults;
		const resArr = data.data;
		resArr.forEach((obj, index) =>{
			resArr[index] =  transformIntlObj(obj, req.params.lan);

		});

		data.data = resArr;
		res.status(200).json( data);
	}))
}
